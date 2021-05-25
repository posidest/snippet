import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink, useHistory, Link } from 'react-router-dom';
import palette from '../../images/palette.jpg'
import './UserBlog.css';
import {parseDate} from '../../utils/helpers'
import { reblogPost } from '../../store/post'
import {findAUser} from '../../store/user'
import { likeAPost, showLikes, unLikePost } from '../../store/likes'
import { followBlog, showFollows, unFollowBlog } from '../../store/follows'

   const BlogPost = ({post, followed, liked, user}) => {
      const [following, setFollowing] = useState(false)
      const [love, setLove] = useState(false)
      const dispatch = useDispatch();
      const sessionUser = useSelector((state) => state.session.user)
      const blogId = user.Blog.id;
      const history = useHistory()

      useEffect(() => {
      if (followed.includes(blogId)) {
         setFollowing(true)
      } else {
         setFollowing(false)
      }
         
      },[followed])
      
        const follow = (e) => {
         // !following ?
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
         !liked.includes(post.id) ?
            dispatch(likeAPost({
               userId: sessionUser.id,
               postId: post.id
            })).then(() => {
                liked.push(post.id)
                setLove(true)
            }) :
            dispatch(unLikePost({
               userId: sessionUser.id,
               postId: post.id
            })).then(() => {
                liked = liked.filter((like) => like !== post.id)    
                setLove(false)
            })
         }


      const reblog = (e) => {
         history.push(`/${post.id}/reblog`)
      }
      
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
                  <Link to={`/${post.Owner.blogName}`}>
                     {post.Owner.blogName}:
                  </Link>
                  <p>
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
                        style={love ? { color: 'red' } : { color: 'none' }}/>
                     </>
                  )}
               <span className='date'>{parseDate(post.createdAt)}</span>
               </div>
            </div>
         )
      }

      export default BlogPost;