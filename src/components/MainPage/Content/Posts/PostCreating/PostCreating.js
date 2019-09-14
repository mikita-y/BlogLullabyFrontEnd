import React from 'react';
import { connect } from 'react-redux'
import { createPostRequest, clearPost } from '../../../../../store/post'
import PostBodyCreating from './PostBodyCreating'
import {Redirect} from 'react-router-dom'
import './PostCreating.css'

class PostCreating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        mainImageFile: null,
        mainImagePreviewUrl: null,
        bodyBlocks: []
      };
  }

  titleChange(event) {
    this.setState({title: event.target.value});
  }

    _upload(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('mainImage', this.state.mainImageFile);

        for (var i = 0; i < this.state.bodyBlocks.length; i++) {
          const block = this.state.bodyBlocks[i];
          formData.append('bodyBlockImages', block.file);
          formData.append('bodyBlockTexts', block.text);
          formData.append('bodyBlockTypes', block.type);
        }
        this.props.submit(formData)
    }
    
    _handleMainImageChange(e) {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        let mainImageFile = file;
        let mainImagePreviewUrl = reader.result
        this.setState({
          mainImageFile,
          mainImagePreviewUrl
        });
      }
      reader.readAsDataURL(file)
    }

  componentDidUpdate() {
    if(this.props.errors){
      alert(this.props.errors)
      this.props.clear();
    }
  }

  
  render() {
    if(this.props.createdPostId){
      this.props.clear();
        return <Redirect to={`/post/${this.props.createdPostId}`} />  
    }

    return (
      <div className="postCreating">
        Adding Post:
        <form>
          <label>
            Title:
            <input 
              type='text'
              value={this.state.title}
              onChange={(e) => this.titleChange(e)} 
            />
          </label>
          <label className="mainImage">
            Main Image:
            <input className="fileInput"
              type="file" 
              accept="image/*"
              onChange={(e)=>this._handleMainImageChange(e)} 
            />
            <img src={this.state.mainImagePreviewUrl}/>
          </label>   
        </form>
        Body:
        <PostBodyCreating update={(body) => this.setState({ bodyBlocks: body })}  />

        <button className="submitButton" 
          onClick={(e)=>this._upload(e)}>Create
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    createdPostId: state.post.createdPostId,
    errors: state.post.errorList
    
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submit: (post) => { dispatch(createPostRequest(post)) },
    clear: () => { dispatch(clearPost()) }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostCreating)