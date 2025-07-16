'use client';

import { useState, useEffect, useRef } from 'react';
import { Save, Plus, Trash2, Maximize2, Minimize2, FileText } from 'lucide-react';
import Header from '@/components/Header';
import { useTrainerToolkitStore, Note } from '@/lib/store';

export default function NoteBoard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { notes: savedNotes, addNote, updateNote, deleteNote } = useTrainerToolkitStore();
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    setNotes(savedNotes);
  }, [savedNotes]);

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setContent(currentNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [currentNote]);

  const handleAutoSave = () => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      if (currentNote && (title !== currentNote.title || content !== currentNote.content)) {
        updateNote(currentNote.id, { title, content });
      }
    }, 1000);
  };

  useEffect(() => {
    if (currentNote) {
      handleAutoSave();
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [title, content, currentNote]);

  const handleCreateNote = () => {
    if (title.trim() || content.trim()) {
      addNote({
        title: title.trim() || 'Untitled Note',
        content: content.trim()
      });
      setShowCreateNote(false);
      setTitle('');
      setContent('');
      setCurrentNote(null);
    }
  };

  const handleSaveNote = () => {
    if (currentNote) {
      updateNote(currentNote.id, { title, content });
    }
  };

  const handleDeleteNote = (noteId: string) => {
    deleteNote(noteId);
    if (currentNote?.id === noteId) {
      setCurrentNote(null);
      setTitle('');
      setContent('');
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderMarkdown = (text: string) => {
    // Simple markdown rendering
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
      .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header 
        title="Note Board" 
        subtitle="Create and display notes with Markdown support"
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Notes List */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-card-foreground">Notes</h2>
                <button
                  onClick={() => setShowCreateNote(true)}
                  className="flex items-center text-teal-600 hover:text-teal-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  New Note
                </button>
              </div>

              {/* Search */}
              <div className="mb-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search notes..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Create Note Form */}
              {showCreateNote && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Note title..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Note content (supports Markdown)..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex space-x-2">
                                          <button
                      onClick={handleCreateNote}
                      disabled={!title.trim() && !content.trim()}
                      className="px-3 py-1 bg-gradient-to-r from-teal-400 to-blue-400 text-white text-sm rounded-lg hover:from-teal-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    >
                      Create
                    </button>
                    <button
                      onClick={() => {
                        setShowCreateNote(false);
                        setTitle('');
                        setContent('');
                      }}
                      className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-lg hover:bg-secondary/80 transition-all duration-200 border border-border"
                    >
                      Cancel
                    </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      currentNote?.id === note.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setCurrentNote(note)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">
                          {note.title}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {note.content.replace(/[#*`]/g, '').substring(0, 50)}
                          {note.content.length > 50 && '...'}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {formatDate(note.updatedAt)}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNote(note.id);
                        }}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredNotes.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  {searchTerm ? 'No notes found' : 'No notes yet'}
                </p>
              )}
            </div>
          </div>

          {/* Note Editor */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {currentNote ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Edit Note</h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveNote}
                        className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </button>
                      <button
                        onClick={toggleFullscreen}
                        className="flex items-center px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        {isFullscreen ? (
                          <Minimize2 className="h-4 w-4 mr-2" />
                        ) : (
                          <Maximize2 className="h-4 w-4 mr-2" />
                        )}
                        {isFullscreen ? 'Exit' : 'Fullscreen'}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content (Markdown supported)
                      </label>
                      <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={12}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                        placeholder="Write your notes here...&#10;&#10;Supports Markdown:&#10;# Headers&#10;**Bold text**&#10;*Italic text*&#10;`code`&#10;- Lists"
                      />
                    </div>

                    <div className="text-xs text-gray-500">
                      Auto-saves every second when you make changes
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a note to edit
                  </h3>
                  <p className="text-gray-500">
                    Choose a note from the list or create a new one to get started
                  </p>
                </div>
              )}
            </div>

            {/* Preview */}
            {currentNote && content && (
              <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 