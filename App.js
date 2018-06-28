/* eslint-env browser */

import React, { Component } from 'react';
import checkUrl from 'valid_url';
import PropTypes from 'prop-types';

const Heading = ({
  handleClick,
}) => (
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

Heading.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

const Button = ({
  type,
  className,
  handleClick,
  text,
}) => (
  <button type={type} className={className} onClick={handleClick}>
    {text}
  </button>
);

Button.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const BookmarksList = ({
  bookmarksArr,
  deleteBookmark,
  editBookmark,
}) => (
  <ul className="bookmark-list">
    {bookmarksArr.map(bookmark => (
      <li key={bookmark} className="bookmark">
        <a href={bookmark} target="_blank" rel="noreferrer noopener" className="bookmark-anchor" name={bookmark}>
          {bookmark.split('').slice(bookmark.indexOf('/') + 2).join('') /* Removes the 'https://' */}
        </a>
        <div className="bookmark-btns">
          <Button type="button" text="Edit" className="btn btn-secondary btn-edit btns-edit-delete" handleClick={editBookmark} />
          <Button type="button" text="Delete" className="btn btn-secondary btn-red btns-edit-delete" handleClick={deleteBookmark} />
        </div>
      </li>
    ))}
  </ul>
);

BookmarksList.propTypes = {
  bookmarksArr: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteBookmark: PropTypes.func.isRequired,
  editBookmark: PropTypes.func.isRequired,
};

const AddBookmarkForm = ({
  value,
  handleChange,
  handleSubmit,
  display,
  handleClick,
  errorMessageDisplay,
}) => (
  <div className="add-bookmark-form-container" style={{ display }}>
    <form onSubmit={handleSubmit} style={{ display }} className="form">
      <label>
        Enter Website Address:
      </label>
      <input type="text" value={value} onChange={handleChange} />
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

AddBookmarkForm.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  display: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  errorMessageDisplay: PropTypes.string.isRequired,
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      bookmarks: ['https://feast-it.com', 'https://github.com', 'https://jamesmcgill.surge.sh'],
      formValue: '',
      AddBookmarkFormDisplay: 'none',
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
    // Checks if a bookmarks array already exists in localStorage
    if (window.localStorage.getItem('bookmarks')) {
      this.setState({
        bookmarks: JSON.parse(window.localStorage.getItem('bookmarks')),
      });
    }
  }

  // This toggles the state that's linked to the AddBookmarkForm Component style.display property
  toggleDisplayAddBookmarkForm() {
    const { AddBookmarkFormDisplay } = this.state;
    this.setState(AddBookmarkFormDisplay === 'none' ? { AddBookmarkFormDisplay: 'flex' } : { AddBookmarkFormDisplay: 'none', formValue: '', errorMessageDisplay: 'none' });
  }

  // Handles input values to make the form a controlled component
  handleChange(event) {
    this.setState({
      formValue: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const {
      bookmarks,
      formValue,
      edit,
      bookmarkToBeEdited,
    } = this.state;

    if (!checkUrl(formValue)) { // Checks the user has entered a vaild URL
      this.setState({
        errorMessageDisplay: 'block',
      });
      return;
    }

    if (!edit) { // Checks if the user has clicked on the edit button to determine whether bookmark should be ammended or added to the array
      this.setState({
        bookmarks: [...bookmarks, formValue],
        formValue: '',
        AddBookmarkFormDisplay: 'none',
        errorMessageDisplay: 'none',
      });
      // Stores the array in localStorage
      window.localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, formValue]));
    } else { // Code to be executed if the user has clicked edit
      // Gets index of the bookmark to be ammended
      const bookmarkIndex = bookmarks.indexOf(bookmarkToBeEdited);
      // bookmarks stored before bookmark to be edited
      const arrBeg = bookmarks.slice(0, bookmarkIndex);
      // bookmarks stored after bookmark to be edited
      const arrEnd = bookmarks.slice(bookmarkIndex + 1);

      this.setState({
        bookmarks: [...arrBeg, formValue, ...arrEnd],
        formValue: '',
        AddBookmarkFormDisplay: 'none',
        edit: false,
        errorMessageDisplay: 'none',
      });
      window.localStorage.setItem('bookmarks', JSON.stringify([...arrBeg, formValue, ...arrEnd]));
    }
  }

  deleteBookmark(event) {
    const { bookmarks } = this.state;

    // Bookmark to be deleted
    const bookmark = event.target.parentElement.parentElement.firstChild.name;
    // Index of bookmark to be deleted
    const bookmarkIndex = bookmarks.indexOf(bookmark);
    // Bookmarks stored before bookmark to be deleted
    const arrBeg = bookmarks.slice(0, bookmarkIndex);
    // Bookmarks stored after bookmark to be deleted
    const arrEnd = bookmarks.slice(bookmarkIndex + 1);
    this.setState({
      bookmarks: [...arrBeg, ...arrEnd],
    });
    window.localStorage.setItem('bookmarks', JSON.stringify([...arrBeg, ...arrEnd]));
  }

  editBookmark(event) {
    this.setState({
      AddBookmarkFormDisplay: 'flex',
      formValue: event.target.parentElement.parentElement.firstChild.name,
      edit: true,
      bookmarkToBeEdited: event.target.parentElement.parentElement.firstChild.name,
    });
  }

  render() {
    const {
      AddBookmarkFormDisplay,
      bookmarks,
      formValue,
      errorMessageDisplay,
    } = this.state;
    return (
      <div>
        <AddBookmarkForm
          display={AddBookmarkFormDisplay}
          handleClick={this.toggleDisplayAddBookmarkForm}
          value={formValue}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errorMessageDisplay={errorMessageDisplay}
        />
        <div className="main-container">
          <Heading
            handleClick={this.toggleDisplayAddBookmarkForm}
          />
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
