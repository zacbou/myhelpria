import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
  increment,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Analytics, GeoStats } from '../types';

const VISITS_COLLECTION = 'visits';
const SEARCHES_COLLECTION = 'searches';

export const recordPageView = async (path: string, country: string): Promise<void> => {
  await addDoc(collection(db, VISITS_COLLECTION), {
    path,
    country,
    timestamp: Timestamp.now(),
  });
};

export const recordSearch = async (term: string): Promise<void> => {
  await addDoc(collection(db, SEARCHES_COLLECTION), {
    term,
    timestamp: Timestamp.now(),
  });
};

export const getAnalytics = async (startDate: Date, endDate: Date): Promise<Analytics> => {
  const visitsQuery = query(
    collection(db, VISITS_COLLECTION),
    where('timestamp', '>=', startDate),
    where('timestamp', '<=', endDate)
  );

  const searchesQuery = query(
    collection(db, SEARCHES_COLLECTION),
    where('timestamp', '>=', startDate),
    where('timestamp', '<=', endDate)
  );

  const [visitsSnapshot, searchesSnapshot] = await Promise.all([
    getDocs(visitsQuery),
    getDocs(searchesQuery),
  ]);

  const visits = visitsSnapshot.docs.map(doc => doc.data());
  const searches = searchesSnapshot.docs.map(doc => doc.data());

  // Calculate total views
  const totalViews = visits.length;

  // Calculate geo stats
  const geoStats: GeoStats[] = Object.entries(
    visits.reduce((acc: Record<string, number>, visit) => {
      const country = visit.country;
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([country, visitors]) => ({
      country,
      visitors,
      percentage: (visitors / totalViews) * 100,
    }))
    .sort((a, b) => b.visitors - a.visitors);

  // Calculate popular search terms
  const searchTerms = Object.entries(
    searches.reduce((acc: Record<string, number>, search) => {
      const term = search.term.toLowerCase();
      acc[term] = (acc[term] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([term, count]) => ({ term, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Calculate daily stats
  const dailyStats = Object.entries(
    visits.reduce((acc: Record<string, number>, visit) => {
      const date = new Date(visit.timestamp.toDate()).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {})
  )
    .map(([date, views]) => ({ date, views }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return {
    totalViews,
    geoStats,
    searchTerms,
    dailyStats,
    activeUsers: Math.floor(totalViews * 0.4), // Estimate active users
    avgTimeOnPage: 185, // Default average time in seconds
    popularArticles: [], // This will be populated by the articles service
  };
};