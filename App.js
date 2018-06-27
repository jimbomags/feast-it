import React, { Component } from 'react';
import checkUrl from 'valid_url';

const Heading = ({ handleClick }) => (
  <div className="heading">
    <div>
      <header>
        <h1>
          Bookmarks:
        </h1>
      </header>
    </div>
    <div className="btn-add-container">
      <Button type="button" text="Add Bookmark" className="btn btn-primary btn-add" handleClick={handleClick} />
    </div>
  </div>
);

const Button = ({ type, className, handleClick, text }) => (
  <button type={type} className={className} onClick={handleClick}>
    {text}
  </button>
);

const BookmarksList = ({ bookmarksArr, deleteBookmark, editBookmark }) => (
  <ul className="bookmark-list">
    {bookmarksArr.map(bookmark => (
      <li key={bookmark} className="bookmark">
        <a href={bookmark} target="_blank" className="bookmark-anchor" name={bookmark}>
          {bookmark.split('').slice(bookmark.indexOf('/') + 2).join('')}
        </a>
        <div className="bookmark-btns">
          <Button type="button" text="Edit" className="btn btn-secondary btn-edit btns-edit-delete" handleClick={editBookmark} />
          <Button type="button" text="Delete" className="btn btn-secondary btn-red btns-edit-delete" handleClick={deleteBookmark} />
        </div>
      </li>
    ))}
  </ul>
);

const AddBookmark = ({ value, handleChange, handleSubmit, display, handleClick, errorMessageDisplay }) => (
  <div className="add-bookmark-form-container" style={{ display }}>
    <form onSubmit={handleSubmit} style={{ display }} className="form">
      <label>
        Enter Website Address:
      </label>
      <input type="text" value={value} onChange={handleChange} autoFocus="true" />
      <span className="error-message" style={{ display: errorMessageDisplay }}>
        URL entered is invalid
      </span>
      <div className="form-btns">
        <Button type="button" text="Cancel" className="btn btn-secondary btn-red" handleClick={handleClick} />
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
      addBookmarkDisplay: 'none',
      edit: false,
      bookmarkToBeEdited: '',
      errorMessageDisplay: 'none',
    };
    this.toggleDisplayAddBookmarkForm = this.toggleDisplayAddBookmarkForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteBookmark = this.deleteBookmark.bind(this);
    this.editBookmark = this.editBookmark.bind(this);
  }

  componentDidMount() {
    if (window.localStorage.getItem('bookmarks')) {
      this.setState({
        bookmarks: JSON.parse(window.localStorage.getItem('bookmarks')),
      });
    }
  }

  toggleDisplayAddBookmarkForm() {
    this.setState(this.state.addBookmarkDisplay === 'none' ? { addBookmarkDisplay: 'flex' } : { addBookmarkDisplay: 'none', formValue: '' });
  }

  handleChange(event) {
    this.setState({
      formValue: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { bookmarks, formValue, edit, bookmarkToBeEdited } = this.state;

    if (!checkUrl(formValue)) {
      this.setState({
        errorMessageDisplay: 'block',
      })
      return
    }

    if (!edit) {
      this.setState({
        bookmarks: [...bookmarks, formValue],
        formValue: '',
        addBookmarkDisplay: 'none',
        errorMessageDisplay: 'none',
      });
      window.localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, formValue]))
    } else {
      const bookmarkIndex = bookmarks.indexOf(bookmarkToBeEdited);
      const arrBeg = bookmarks.slice(0, bookmarkIndex);
      const arrEnd = bookmarks.slice(bookmarkIndex + 1);

      this.setState({
        bookmarks: [...arrBeg, formValue, ...arrEnd],
        formValue: '',
        addBookmarkDisplay: 'none',
        edit: false,
        errorMessageDisplay: 'none',
      });
      window.localStorage.setItem('bookmarks', JSON.stringify([...arrBeg, formValue, ...arrEnd]));
    }
  }

  deleteBookmark(event) {
    const { bookmarks } = this.state;
    const bookmark = event.target.parentElement.parentElement.firstChild.name;
    const bookmarkIndex = bookmarks.indexOf(bookmark);
    const arrBeg = bookmarks.slice(0, bookmarkIndex);
    const arrEnd = bookmarks.slice(bookmarkIndex + 1);
    this.setState({
      bookmarks: [...arrBeg, ...arrEnd],
    });
    window.localStorage.setItem('bookmarks', JSON.stringify([...arrBeg, ...arrEnd]))
  }

  editBookmark(event) {
    this.setState({
      addBookmarkDisplay: 'flex',
      formValue: event.target.parentElement.parentElement.firstChild.name,
      edit: true,
      bookmarkToBeEdited: event.target.parentElement.parentElement.firstChild.name,
    });
  }

  render() {
    const { addBookmarkDisplay, bookmarks, formValue, errorMessageDisplay } = this.state;
    return (
      <div>
        <AddBookmark
          display={addBookmarkDisplay}
          handleClick={this.toggleDisplayAddBookmarkForm}
          value={formValue}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errorMessageDisplay={errorMessageDisplay}
        />
        <div className="main-container">
          <Heading handleClick={this.toggleDisplayAddBookmarkForm} />
          <BookmarksList
            bookmarksArr={bookmarks}
            deleteBookmark={this.deleteBookmark}
            editBookmark={this.editBookmark}
          />
        </div>
      </div>
    );
  }
}

export default App;
