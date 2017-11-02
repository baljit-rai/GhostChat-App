import React, { Component } from 'react';

export default class Post extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comments: {}
    }

  this.addComment = this.addComment.bind(this);
  this.renderComment = this.renderComment.bind(this);
  }

  addComment(commentData) {
    (foo, bar, ...args) => {
    }
    var timeStamp = (new Date()).getTime();
    this.state.comments['comment-id' + timeStamp] = commentData;
    this.setState({
      comments: this.state.comments
    });
  }

  renderComment(key) {
    return (
      <li className="">
        <NewComment key={key} index={key} details={this.state.comments[key]} />
      </li>
    )
  }

  render() {
    return (
      <div className="row medium-8 large-7 columns">

      <AddCommentForm addComment={this.addComment}/>

        <ol className="comment-list block-comments">
            {
              Object
                .keys(this.state.comments)
                 // Creating a NEW array
                .map(this.renderComment)
            }
        </ol>

      </div>
    )}

}


/*
  Add comment Form
  <AddCommentForm />
*/
// Semi-Dumb
class AddCommentForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      desc: ""
    }

  this.handleNameChange = this.handleNameChange.bind(this);
  this.handleDescChange = this.handleDescChange.bind(this);
  this.processComment = this.processComment.bind(this);

  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });

  }

  handleDescChange(event) {
    this.setState({
      desc: event.target.value
    });
  }

  processComment(event) {
    event.preventDefault();

    // 1. Take data from from form
    var commentData = {
      commentName: this.state.name,
      commentBody: this.state.desc
    }
    this.setState({
      name: "",
      desc: ""
    })
    // 2. Pass data back to App
    this.props.addComment(commentData);
    // 3. Reset the form
    this.refs.commentForm.reset();

  }

  render () {
    return (
      <div className="callout secondary postcomments">
        <h4 className="leave-comment">What's on your mind ?</h4>
        <form className="post-edit" ref="commentForm" onSubmit={this.processComment}>
          <input type="text" name="name" onChange={this.handleNameChange} value={this.state.name} placeholder="Topic" required/>
          <input type="text" name="desc" onChange={this.handleDescChange} value={this.state.desc} placeholder={"Comment/Question"} required/>
          <button id="submit" type="submit" className="button button-outline comment-button action-button expand-right">Submit</button>
        </form>
      </div>
    )
  }
}


/*
  Newcomment
  <NewComment />
*/
class NewComment extends Component {
  render () {
    return (
      <div className="block-comment-content module text">
        <div className="comment-user">
          <div className="comment-user-avatar-wrap">
            <a>
              <img src="//s3-us-west-2.amazonaws.com/s.cdpn.io/3/profile/profile-512_29.jpg" className="comment-avatar" alt="" />
            </a>
          </div>
          <div className="comment-user-text">
            <a href="#0" data-username="cathbailh" className="comment-username">
                <span className="username">
                  {this.props.details.commentName}
                </span>
            </a>
            <span className="on"></span>
            <a href="#0">
              <time className="block-comment-time">
                {''}
              </time>
            </a>
          </div>
        </div>

        <div className="comment-text">
          <p>{this.props.details.commentBody}</p>
        </div>
      </div>

    )
  }
}

