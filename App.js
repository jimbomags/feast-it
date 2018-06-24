import React, { Component } from 'react';

const Button = ({ type, className, handleClick, text }) => (
  <button type={type} className={className} onClick={handleClick}>
    {text}
  </button>
);

const Bookmarks = ({ bookmarksArr }) => bookmarksArr.map(bookmark => (
  <li key={bookmark}>
    {bookmark}
  </li>
));

const AddBookmark = ({ value, handleChange, handleSubmit, display }) => (
  <form onSubmit={handleSubmit} style={{ display }}>
    <label>
      Enter Website Address
    </label>
    <input type="text" value={value} onChange={handleChange} />
  </form>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmarks: [],
      formValue: '',
      AddBookmarkDisplay: 'none',
    };
  }
}

export default App;

// App component
// Hyperlinks list component
// Add link form component
// Button component for Add, Edit & Delete functionality
