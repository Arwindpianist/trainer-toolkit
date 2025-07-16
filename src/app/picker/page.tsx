'use client';

import { useState, useEffect } from 'react';
import { RotateCcw, Plus, Trash2, Save, Users, Shuffle } from 'lucide-react';
import Header from '@/components/Header';
import { useTrainerToolkitStore, PickerList } from '@/lib/store';

export default function RandomPicker() {
  const [currentList, setCurrentList] = useState<PickerList | null>(null);
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');
  const [listName, setListName] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [showCreateList, setShowCreateList] = useState(false);
  const [pickCount, setPickCount] = useState(1);
  const [removeAfterPick, setRemoveAfterPick] = useState(false);

  const { pickerLists, addPickerList, updatePickerList, deletePickerList } = useTrainerToolkitStore();

  useEffect(() => {
    if (currentList) {
      setItems(currentList.items);
      setListName(currentList.name);
    }
  }, [currentList]);

  const handleAddItem = () => {
    if (newItem.trim() && !items.includes(newItem.trim())) {
      const updatedItems = [...items, newItem.trim()];
      setItems(updatedItems);
      setNewItem('');
      
      if (currentList) {
        updatePickerList(currentList.id, updatedItems);
      }
    }
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    
    if (currentList) {
      updatePickerList(currentList.id, updatedItems);
    }
  };

  const handleCreateList = () => {
    if (listName.trim() && items.length > 0) {
      addPickerList({
        name: listName,
        items: items
      });
      setShowCreateList(false);
      setListName('');
      setItems([]);
      setCurrentList(null);
    }
  };

  const handleSelectList = (list: PickerList) => {
    setCurrentList(list);
    setSelectedItems([]);
    setWinner(null);
  };

  const spinWheel = () => {
    if (items.length === 0) return;

    setIsSpinning(true);
    setWinner(null);

    // Simulate spinning animation
    const spinDuration = 2000;
    const spinInterval = 50;
    const iterations = spinDuration / spinInterval;
    let currentIteration = 0;

    const spin = () => {
      if (currentIteration < iterations) {
        const randomIndex = Math.floor(Math.random() * items.length);
        setWinner(items[randomIndex]);
        currentIteration++;
        setTimeout(spin, spinInterval);
      } else {
        // Final selection
        const availableItems = items.filter(item => !selectedItems.includes(item));
        if (availableItems.length === 0) {
          setWinner('All items have been selected!');
        } else {
          const finalWinner = availableItems[Math.floor(Math.random() * availableItems.length)];
          setWinner(finalWinner);
          
          if (removeAfterPick) {
            const updatedItems = items.filter(item => item !== finalWinner);
            setItems(updatedItems);
            if (currentList) {
              updatePickerList(currentList.id, updatedItems);
            }
          } else {
            setSelectedItems([...selectedItems, finalWinner]);
          }
        }
        setIsSpinning(false);
      }
    };

    spin();
  };

  const resetSelection = () => {
    setSelectedItems([]);
    setWinner(null);
  };

  const getSpinnerStyle = () => {
    if (!isSpinning) return {};
    
    return {
      animation: 'spin 0.05s linear infinite'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header 
        title="Random Picker" 
        subtitle="Spin to randomly select names or items from your list"
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Spinner Section */}
          <div className="bg-card rounded-2xl border border-border/50 p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-card-foreground mb-6 text-center">Random Picker</h2>
            
            {/* Winner Display */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-teal-400 to-blue-400 rounded-xl p-8 mb-6 shadow-lg shadow-teal-500/25">
                <div className="text-4xl font-bold text-white mb-2">
                  {winner || 'Ready to Spin!'}
                </div>
                {currentList && (
                  <div className="text-blue-100">
                    From: {currentList.name} ({items.length} items)
                  </div>
                )}
              </div>
              
              {/* Spinner Icon */}
              <div className="flex justify-center mb-6">
                <div 
                  className={`p-4 bg-gray-100 rounded-full ${isSpinning ? 'animate-spin' : ''}`}
                  style={getSpinnerStyle()}
                >
                  <Shuffle className="h-8 w-8 text-gray-600" />
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={spinWheel}
                    disabled={items.length === 0 || isSpinning}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-400 text-white rounded-xl hover:from-teal-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-teal-500/25"
                  >
                    <Shuffle className="h-5 w-5 mr-2" />
                    {isSpinning ? 'Spinning...' : 'Spin!'}
                  </button>
                  
                  <button
                    onClick={resetSelection}
                    disabled={selectedItems.length === 0}
                    className="flex items-center px-6 py-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-border"
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reset
                  </button>
                </div>

                {/* Settings */}
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={removeAfterPick}
                      onChange={(e) => setRemoveAfterPick(e.target.checked)}
                      className="mr-2"
                    />
                    Remove after pick
                  </label>
                </div>
              </div>
            </div>

            {/* Selected Items */}
            {selectedItems.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Selected Items</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedItems.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* List Management */}
          <div className="space-y-6">
            {/* Current List */}
            {currentList && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">{currentList.name}</h2>
                  <button
                    onClick={() => {
                      setCurrentList(null);
                      setItems([]);
                      setSelectedItems([]);
                      setWinner(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>

                {/* Add Item */}
                <div className="flex space-x-2 mb-4">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                    placeholder="Add new item..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleAddItem}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-gray-900">{item}</span>
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {items.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No items in this list</p>
                )}
              </div>
            )}

            {/* Saved Lists */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Saved Lists</h2>
                <button
                  onClick={() => setShowCreateList(true)}
                  className="flex items-center text-blue-600 hover:text-blue-700"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  New List
                </button>
              </div>

              {showCreateList && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        List Name
                      </label>
                      <input
                        type="text"
                        value={listName}
                        onChange={(e) => setListName(e.target.value)}
                        placeholder="e.g., Team Members"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Items (one per line)
                      </label>
                      <textarea
                        value={items.join('\n')}
                        onChange={(e) => setItems(e.target.value.split('\n').filter(item => item.trim()))}
                        placeholder="Item 1&#10;Item 2&#10;Item 3"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={handleCreateList}
                        disabled={!listName.trim() || items.length === 0}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <Save className="h-4 w-4 mr-2 inline" />
                        Save List
                      </button>
                      <button
                        onClick={() => setShowCreateList(false)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {pickerLists.map((list) => (
                  <div
                    key={list.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      currentList?.id === list.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleSelectList(list)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">{list.name}</div>
                        <div className="text-sm text-gray-500">
                          {list.items.length} items
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePickerList(list.id);
                          if (currentList?.id === list.id) {
                            setCurrentList(null);
                            setItems([]);
                            setSelectedItems([]);
                            setWinner(null);
                          }
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {pickerLists.length === 0 && (
                <p className="text-gray-500 text-center py-4">No saved lists</p>
              )}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 