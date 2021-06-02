import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink, useHistory, Link } from 'react-router-dom';
import palette from '../../images/palette.jpg'
import './UserBlog.css';
import {parseDate} from '../../utils/helpers'
import { likeAPost, showLikes, unLikePost } from '../../store/likes'
import { followBlog, showFollows, unFollowBlog } from '../../store/follows'

   const BlogPost = ({post, followed, user}) => {
      const [following, setFollowing] = useState(false)
      const [love, setLove] = useState(false)
      const dispatch = useDispatch();
      let liked;
      const userLikes = useSelector(state => state.likes.userLikes)
       if (userLikes) {
        liked = userLikes.map(like => like.postId);
    }
      const sessionUser = useSelector((state) => state.session.user)
      const blogId = user.Blog.id;
      const history = useHistory()
      const postId = post.id;

      useEffect(() => {
      if (followed.includes(blogId)) {
         setFollowing(true)
      } else {
         setFollowing(false)
      }       
      },[followed])

      useEffect(() => {
         if(liked) {
            if (liked.includes(postId)) {
               setLove(true)
            } else {
               setLove(false)
            }    
         }
      },[liked, userLikes, dispatch])
      
        const follow = (e) => {
         !followed.includes(blogId) ?
         dispatch(followBlog({
            userId: sessionUser.id,
            blogId: blogId
         })).then(() => {
             followed.push(blogId) 
             setFollowing(true)
         }) :
         dispatch(unFollowBlog({
            userId: sessionUser.id,
            blogId: blogId,
         })).then(() => {
             followed = followed.filter((follow) => follow !== blogId)
             setFollowing(false)
         })
      }

      const like = (e) => {
         !liked.includes(postId) ?
            dispatch(likeAPost({
               userId: sessionUser.id,
               postId
            })).then(() => {
                liked.push(postId)
                dispatch(showLikes())
                setLove(true)
            }) :
            dispatch(unLikePost(postId)).then(() => {
                liked = liked.filter((like) => like !== postId)
                dispatch(showLikes())    
                setLove(false)
            })
         }


      const reblog = (e) => {
         history.push(`/${post.id}/reblog`)
      }
      if(userLikes) {
         return (
            <div className='post' key={post.id}>
               {post.type === 'image' && (
               <div className='image-post'>
                  <img src={post.content} alt='image' 
                  style={{maxWidth: '400px', maxHeight: '400px'}}/>
               </div>
               )}
               {post.type === 'words' && (
               <div className='word-post'>
                  <p style={{color: 'black'}}>{post.content}</p>
               </div>)}
               {post.type === 'link' && (
               <div className='link-post'>
                  <a href={post.content}>{post.content}</a>
               </div>)}
               <div className='caption-div'>
                  <Link to={`/${post.Owner.blogName}`} style={{color: 'deepskyblue'}}> 
                     {post.Owner.blogName}:
                  </Link>
                  <p style={{color: 'gray', fontStyle: 'italic', paddingLeft: '5px'}}>
                     {post.caption}
                  </p>
               </div>
               <div className='underline'>            
               </div>
               <div className='post-foot'>
                  {sessionUser.id !== post.User.id && (
                     <>
                        <i className='fas fa-sync-alt' onClick={reblog}/>
                        <i className='fas fa-heart' 
                        value={post.id}
                        onClick={like}
                        style={love ? {color: 'red'} : {color: 'none'}}/>
                     </>
                  )}
                  <span className='date'>{parseDate(post.createdAt)}</span>
               </div>
            </div>
         )
      } else {
         return <h1>...loading</h1>
      }
      }

      export default BlogPost;