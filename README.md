# 🐰 How Vue Works - A Vue.js Implementation

A comprehensive implementation of Vue.js core features from scratch, demonstrating how Vue's reactivity system, template parsing, directives, and component system work under the hood.

## 🎯 What This Project Is

This is an educational implementation that recreates Vue.js's core functionality to understand how modern reactive frameworks work. It includes:

- **Template Parser**: HTML template parsing with directive support
- **Reactivity System**: Data observation and change detection
- **Directives**: v-bind, v-if, v-for, v-on, and mustache interpolation
- **Component System**: Component creation, lifecycle, and communication
- **Event System**: Component event broadcasting and dispatching
- **Batch Updates**: Performance optimization through batched DOM updates
- **Slot System**: Content projection between components

## 🏗️ Architecture Overview

### Core Modules

```
src/
├── template-parser.js    # HTML template parsing and AST generation
├── directives.js         # Directive implementations (v-bind, v-if, v-for, etc.)
├── observe.js           # Reactive data system with watchers
├── batch-update.js      # Batched DOM updates for performance
├── components.js        # Component creation and management
├── events.js           # Component event system ($emit, $on, $broadcast)
├── hooks.js            # Component hooks (useData, useMethods, etc.)
├── lifecycle.js        # Component lifecycle management
├── render.js           # Main rendering orchestration
├── slot.js             # Slot content projection
├── queue.js            # Queue data structure
├── stack.js            # Stack data structure
├── linked-list.js      # Linked list for component tree
└── errors.js           # Error handling utilities
```

### Key Concepts

#### 1. **Reactive Data System**

- Uses `Object.defineProperty` to create getters/setters
- Watchers are triggered when data changes
- Supports nested objects and arrays
- Automatic dependency tracking

#### 2. **Template Parsing**

- Parses HTML templates into AST (Abstract Syntax Tree)
- Handles directives, components, and text interpolation
- Supports nested templates for v-if and v-for

#### 3. **Directive System**

- **Mustache `{{}}`**: Text interpolation
- **v-bind**: Dynamic attribute binding
- **v-if**: Conditional rendering
- **v-for**: List rendering with track-by optimization
- **v-on**: Event handling

#### 4. **Component System**

- Component tree creation and management
- Props passing and validation
- Lifecycle hooks (mounted, unmounted)
- Component communication via events

#### 5. **Event System**

- `$emit`: Emit events to parent components
- `$on`: Listen to events
- `$broadcast`: Broadcast events to all descendants
- `$dispatch`: Dispatch events up the component tree

#### 6. **Batch Updates**

- Queues DOM updates to prevent excessive re-renders
- Uses microtasks for optimal performance
- Deduplicates updates with the same watcher ID

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- Yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd how-vue-works

# Install dependencies
yarn install

# Run tests
yarn test
```

### Basic Usage

```javascript
import render from './src/render';
import observe from './src/observe';

// Create reactive data
const data = observe({
  message: 'Hello Vue!',
  items: ['Apple', 'Banana', 'Orange'],
  showList: true,
});

// Define a component
const MyComponent = () => `
  <div>
    <h1>{{ message }}</h1>
    <ul v-if="showList">
      <li v-for="item in items" track-by="item">{{ item }}</li>
    </ul>
    <button v-on:click="toggleList">Toggle List</button>
  </div>
`;

// Render the component
const { componentNode } = render(MyComponent, {}, '#app');
```

## 📚 Core Features Explained

### 1. Template Parsing

The template parser converts HTML strings into a structured format that can be processed by the directive system:

```javascript
// Template
const template = '<div v-if="show">{{ message }}</div>';

// Parsed into AST-like structure with directives
// - Element: div
// - Directives: [v-if, mustache]
// - Attributes: { 'v-if': 'show' }
```

### 2. Reactive Data

Data becomes reactive through the observe function:

```javascript
const data = observe({
  count: 0,
  user: { name: 'John' },
});

// Changes trigger watchers automatically
data.count = 1; // Triggers all watchers for 'count'
data.user.name = 'Jane'; // Triggers watchers for 'user.name'
```

### 3. Directives

Each directive handles specific DOM manipulation:

- **Mustache**: Updates text content when data changes
- **v-bind**: Updates element attributes
- **v-if**: Conditionally renders/removes elements
- **v-for**: Renders lists with optimization
- **v-on**: Binds event listeners

### 4. Component Communication

Components communicate through events:

```javascript
// Parent component
const Parent = () => `
  <child-component v-on:message="handleMessage"></child-component>
`;

// Child component
const Child = () => `
  <button v-on:click="sendMessage">Send Message</button>
`;

// Child emits event
componentNode.$emit('message', 'Hello from child!');
```

### 5. Batch Updates

DOM updates are batched for performance:

```javascript
// Multiple rapid changes trigger only one update
data.count = 1;
data.count = 2;
data.count = 3;
// Only one DOM update occurs
```

## 🧪 Testing

The project includes comprehensive tests for all features:

```bash
# Run all tests
yarn test

# Run specific test file
yarn test test/directives.spec.js

# Run tests in watch mode
yarn test --watch
```

Test coverage includes:

- Template parsing
- Directive functionality
- Reactive data system
- Component lifecycle
- Event system
- Batch updates
- Slot system

## 🔧 Development

### Project Structure

```
how-vue-works/
├── src/                 # Source code
├── test/               # Test files
├── package.json        # Dependencies and scripts
├── babel.config.js     # Babel configuration
├── .eslintrc.json      # ESLint configuration
└── .prettierrc.json    # Prettier configuration
```

### Key Dependencies

- **lodash**: Utility functions
- **jest**: Testing framework
- **babel**: JavaScript transpilation
- **eslint**: Code linting
- **prettier**: Code formatting

### Development Workflow

1. Make changes to source files in `src/`
2. Add corresponding tests in `test/`
3. Run tests to ensure functionality
4. Code is automatically formatted and linted

## 🎓 Learning Objectives

This project demonstrates:

1. **Reactive Programming**: How data changes trigger UI updates
2. **Template Compilation**: Converting templates to executable code
3. **Virtual DOM Concepts**: Efficient DOM manipulation
4. **Component Architecture**: Building reusable UI components
5. **Event Systems**: Component communication patterns
6. **Performance Optimization**: Batching and deduplication strategies

## 🤝 Contributing

This is an educational project. Feel free to:

- Report bugs or issues
- Suggest improvements
- Add new features
- Improve documentation

## 📄 License

ISC License - see LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by Vue.js architecture
- Built for educational purposes
- Thanks to the Vue.js team for the excellent framework

---

**Note**: This is an educational implementation and should not be used in production. It's designed to help understand how modern reactive frameworks work under the hood.
