import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Scroll, 
  Sparkles, 
  BookOpen, 
  Code2, 
  Wand2, 
  Skull, 
  Brain,
  Scale,
  Network,
  MessageCircle,
  Lightbulb,
  BookmarkPlus,
  BookmarkCheck,
  ThumbsUp,
  Send,
  ChevronDown,
  ChevronRight,
  Trash2,
  FolderPlus,
  Edit3,
  Tag,
  Share2,
  Filter
} from 'lucide-react';

interface Theme {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  stages: string[];
}

interface Insight {
  id: number;
  content: string;
  theme: string;
  timestamp: string;
  tags?: string[];
  isFeatured?: boolean;
  collectionId?: number;
}

interface Collection {
  id: number;
  title: string;
  description?: string;
  insights: Insight[];
  timestamp: string;
}

interface DraggableInsightProps {
  insight: Insight;
  onRemove: (id: number) => void;
  index: number;
  onReorder?: (sourceIndex: number, targetIndex: number) => void;
}

interface DroppableCollectionProps {
  collection: Collection;
  onDrop: (collectionId: number, insight: Insight) => void;
  onEdit: (collection: Collection) => void;
  onDelete: (collectionId: number) => void;
}

const DraggableInsight: React.FC<DraggableInsightProps> = ({ insight, onRemove, index, onReorder }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', JSON.stringify({
      insight,
      sourceIndex: index,
      collectionId: insight.collectionId
    }));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`p-4 border rounded-md ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex justify-between">
        <span>{insight.content}</span>
        <button onClick={() => onRemove(insight.id)}>
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const DroppableCollection: React.FC<DroppableCollectionProps> = ({ collection, onDrop, onEdit, onDelete }) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    onDrop(collection.id, data.insight);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`p-4 border rounded-md ${isOver ? 'border-purple-500' : ''}`}
    >
      <h3 className="font-bold mb-2">{collection.title}</h3>
      <div className="space-y-2">
        {collection.insights.map((insight, index) => (
          <DraggableInsight
            key={insight.id}
            insight={insight}
            index={index}
            onRemove={() => onDelete(collection.id, insight.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default function MythicMachinesInterface() {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [userInput, setUserInput] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyStage, setStoryStage] = useState(0);
  const [collections, setCollections] = useState<Collection[]>([]);

  const mythicThemes: Theme[] = [
    {
      id: 1,
      title: "The Creation Myth",
      description: "Explore how AI systems emerge and evolve, paralleling ancient creation myths",
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      stages: ["the primordial digital void", "the emergence of consciousness", "the creation of order from chaos"]
    },
    {
      id: 2,
      title: "The Hero's Journey",
      description: "Follow the path of AI development through the lens of the hero's journey",
      icon: <Scroll className="w-6 h-6 text-blue-500" />,
      stages: ["the call to adventure", "trials and tribulations", "return with the elixir"]
    },
    {
      id: 3,
      title: "The Oracle's Vision",
      description: "AI predictions and insights viewed through prophetic traditions",
      icon: <BookOpen className="w-6 h-6 text-green-500" />,
      stages: ["the seeking of wisdom", "the revelation", "the interpretation"]
    }
  ];

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    setGeneratedContent('');
    setUserInput('');
    setStoryStage(0);
  };

  const handleGenerateClick = async () => {
    if (!userInput.trim()) return;
    
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newContent = `Generated content for ${selectedTheme!.title} with ${userInput}...`;
    setGeneratedContent(prevContent => prevContent ? `${prevContent}\n\n${newContent}` : newContent);
    setStoryStage(prev => prev + 1);
    setIsGenerating(false);
  };

  const handleCollectionDrop = (collectionId: number, insight: Insight) => {
    setCollections(collections.map(collection => {
      if (collection.id === collectionId) {
        return {
          ...collection,
          insights: [...collection.insights, { ...insight, collectionId }]
        };
      }
      return collection;
    }));
  };

  const handleCollectionDelete = (collectionId: number, insightId: number) => {
    setCollections(collections.map(collection => {
      if (collection.id === collectionId) {
        return {
          ...collection,
          insights: collection.insights.filter(insight => insight.id !== insightId)
        };
      }
      return collection;
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Mythic Machines</h1>
        <p className="text-lg text-gray-600">
          Explore the intersection of artificial intelligence and mythological archetypes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mythicThemes.map((theme) => (
          <Card 
            key={theme.id}
            className={`cursor-pointer hover:shadow-lg ${
              selectedTheme?.id === theme.id ? 'ring-2 ring-purple-500' : ''
            }`}
            onClick={() => handleThemeSelect(theme)}
          >
            <CardHeader className="flex flex-row items-center space-x-4">
              {theme.icon}
              <CardTitle>{theme.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{theme.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTheme && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {selectedTheme.icon}
              <span>{selectedTheme.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Enter a key element for your story..."
                  className="flex-1 p-2 border rounded-md"
                />
                <button
                  onClick={handleGenerateClick}
                  disabled={!userInput.trim() || isGenerating}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md disabled:bg-gray-400"
                >
                  {isGenerating ? 'Generating...' : 'Generate'}
                </button>
              </div>

              {generatedContent && (
                <div className="prose">
                  <p className="whitespace-pre-line">{generatedContent}</p>
                </div>
              )}

              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Collections</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {collections.map(collection => (
                    <DroppableCollection
                      key={collection.id}
                      collection={collection}
                      onDrop={handleCollectionDrop}
                      onEdit={() => {}}
                      onDelete={handleCollectionDelete}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
