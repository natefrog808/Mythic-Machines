# Mythic-Machines

A React-based interface exploring the intersection of artificial intelligence and mythological archetypes. This application allows users to generate narratives based on mythological themes and organize insights using a drag-and-drop collection system.

## Features

### Theme Selection
- Interactive theme cards with unique icons and descriptions
- Three foundational themes:
  - The Creation Myth (exploring AI emergence)
  - The Hero's Journey (AI development path)
  - The Oracle's Vision (AI predictions and insights)
- Visual feedback for selected themes
- Responsive grid layout adapting to different screen sizes

### Story Generation
- User input integration for personalized narratives
- Staged content generation with loading states
- Theme-specific narrative templates
- Progress tracking for story development

### Collection Management
- Drag-and-drop interface for organizing insights
- Collection creation and management
- Real-time visual feedback during drag operations
- Insight organization within collections

## Components

### DraggableInsight
A draggable component representing individual insights with:
- Drag-and-drop event handling
- Visual feedback during drag operations
- Delete functionality
- Content display with formatting

### DroppableCollection
A container component for insights featuring:
- Drop zone functionality
- Visual feedback during drag-over states
- Collection title display
- Insight list management

### MythicMachinesInterface
The main component integrating all features:
- Theme selection grid
- Story generation interface
- Collection management system
- State management for all interactions

## Technical Implementation

### State Management
```javascript
const [selectedTheme, setSelectedTheme] = useState(null);
const [userInput, setUserInput] = useState('');
const [generatedContent, setGeneratedContent] = useState('');
const [isGenerating, setIsGenerating] = useState(false);
const [storyStage, setStoryStage] = useState(0);
const [collections, setCollections] = useState([]);
```

### Drag and Drop
- HTML5 Drag and Drop API implementation
- Data transfer using JSON stringification
- Collection-aware drag operations
- Drop validation and handling

### UI Framework
- Built with React and shadcn/ui components
- Lucide React icons for visual elements
- Tailwind CSS for styling
- Responsive design principles

## Usage

### Theme Selection
1. Browse the available themes in the grid
2. Click a theme card to select it
3. View theme details and stage progression

### Story Generation
1. Enter a key element in the input field
2. Click "Generate" to create narrative content
3. View generated content with formatting
4. Track progress through story stages

### Collection Management
1. Create new collections for organizing insights
2. Drag insights between collections
3. Delete unwanted insights
4. Organize collections with drag-and-drop

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Dependencies

- React
- @/components/ui (shadcn/ui)
- lucide-react
- Tailwind CSS

## Project Structure

```
src/
  ├── components/
  │   └── MythicMachinesInterface.jsx
  ├── styles/
  │   └── tailwind.css
  └── App.jsx
```

## Future Enhancements

- Additional mythological themes
- Enhanced story generation algorithms
- Advanced collection organization features
- Sharing and export capabilities
- Multi-select drag-and-drop
- Collection filtering and search

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
