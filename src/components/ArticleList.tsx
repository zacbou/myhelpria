import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Edit, Trash2, Loader, AlertCircle } from 'lucide-react';
import { getArticles, deleteArticle } from '../lib/firebase/db';
import type { Article } from '../types';

export default function ArticleList() {
  const { t } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    setError(null);
    const { articles, error } = await getArticles();
    if (error) {
      setError(error);
    } else {
      setArticles(articles);
    }
    setLoading(false);
  };

  const handleDelete = async (articleId: string) => {
    if (!window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      return;
    }

    setDeletingId(articleId);
    const { error } = await deleteArticle(articleId);
    if (error) {
      setError(error);
    } else {
      setArticles(articles.filter(article => article.id !== articleId));
    }
    setDeletingId(null);
  };

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-center h-32">
          <Loader className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
            {t('articles.published')}
          </h3>
        </div>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{article.title}</h4>
                    <button
                      onClick={() => handleDelete(article.id)}
                      disabled={deletingId === article.id}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="Delete article"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {article.category}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{article.content}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {article.views?.toLocaleString() || 0} views
                    </div>
                    <time dateTime={article.lastUpdated} className="text-xs">
                      {new Date(article.lastUpdated).toLocaleDateString()}
                    </time>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-3">
                  <div className="text-xs text-gray-500">
                    Last updated: {new Date(article.lastUpdated).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">{t('articles.noArticles')}</h3>
            <p className="mt-1 text-sm text-gray-500">{t('articles.getStarted')}</p>
          </div>
        )}
      </div>
    </div>
  );
}