import React, { Component } from 'react';

const Heading = () => (
  <div>
    <header>
      <h1>
        Bookmarks:
      </h1>
    </header>
    <Button type="button" text="Add Bookmark" />
  </div>
);

const Button = ({ type, className, handleClick, text }) => (
  <button type={type} className={className} onClick={handleClick}>
    {text}
  </button>
);

const Bookmarks = ({ bookmarksArr }) => (
  <ul>
    {bookmarksArr.map(bookmark => (
      <li key={bookmark}>
        {bookmark}
      </li>
    ))}
  </ul>
);

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
      bookmarks: ['https://feast-it.com', 'https://github.com', 'https://jamesmcgill.surge.sh'],
      formValue: '',
      AddBookmarkDisplay: 'none',
    };
  }

  render() {
    return (
      <div>
        <Heading />
        <Bookmarks bookmarksArr={this.state.bookmarks} />
      </div>);
  }
}

export default App;

// App component
// Hyperlinks list component
// Add link form component
// Button component for Add, Edit & Delete functionality
