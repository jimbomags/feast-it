import React, { Component } from 'react';

const Heading = () => (
  <div className="heading">
    <div>
      <header>
        <h1>
          Bookmarks:
        </h1>
      </header>
    </div>
    <div className="btn-add-container">
      <Button type="button" text="Add Bookmark" className="btn btn-primary btn-add" />
    </div>
  </div>
);

const Button = ({ type, className, handleClick, text }) => (
  <button type={type} className={className} onClick={handleClick}>
    {text}
  </button>
);

const BookmarksList = ({ bookmarksArr }) => (
  <ul className="bookmark-list">
    {bookmarksArr.map(bookmark => (
      <li key={bookmark} className="bookmark">
        <a href={bookmark} target="_blank" className="bookmark-anchor">
          {bookmark.split('').slice(bookmark.indexOf('/') + 2).join('')}
        </a>
        <div className="bookmark-btns">
          <Button type="button" text="Edit" className="btn btn-secondary btn-edit btns-edit-delete" />
          <Button type="button" text="Delete" className="btn btn-secondary btn-red btns-edit-delete" />
        </div>
      </li>
    ))}
  </ul>
);

const AddBookmark = ({ value, handleChange, handleSubmit, display }) => (
  <div className="add-bookmark-form-container" style={{ display }}>
    <form onSubmit={handleSubmit} style={{ display }} className="form">
      <label>
        Enter Website Address:
      </label>
      <input type="text" value={value} onChange={handleChange} />
      <div className="form-btns">
        <Button type="button" text="Cancel" className="btn btn-secondary btn-red" />
        <Button type="submit" text="Add" className="btn btn-secondary btn-add" />
      </div>
    </form>
  </div>
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
      <AddBookmark display={this.state.AddBookmarkDisplay}/>
      <div className="main-container">
        <Heading />
        <BookmarksList bookmarksArr={this.state.bookmarks} />
      </div>
      </div>
    );
  }
}

export default App;

// App component
// Hyperlinks list component
// Add link form component
// Button component for Add, Edit & Delete functionality
