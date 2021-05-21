import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import palette from '../../images/palette.jpg'
import './Dashboard.css';
import { reblogPost } from '../../store/post'
import { likeAPost, showLikes, unLikePost } from '../../store/likes'
import { followBlog, showFollows, unFollowBlog } from '../../store/follows'

   const Post = ({post, followed, liked}) => {
      const [following, setFollowing] = useState(false)
      const [love, setLove] = useState(false)
       const dispatch = useDispatch();
       const sessionUser = useSelector((state) => state.session.user);

      const reblog = (e) => {
         dispatch(reblogPost(post))
      }
      
      const follow = (e) => {
         !followed.includes(post.Blogs[0].id) ?
         dispatch(followBlog({
            userId: sessionUser.id,
            blogId: post.Blogs[0].id
         })).then(() => {
             followed.push(post.Blogs[0].id) 
             setFollowing(true)
         }) :
         dispatch(unFollowBlog({
            userId: sessionUser.id,
            blogId: post.Blogs[0].id
         })).then(() => {
             followed = followed.filter((follow) => follow !== post.Blogs[0].id)
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

         return (
            <div className='dash'
               key={post.id}>
               <img src={post.User.avatar || palette}
                  alt='avatar'
                  className='avatar' />
               <div className='content-div'>
                  <div className='blog-info'>
                     <a href={`/${post.User.blogName}`}>
                           {post.User.blogName}
                     </a>
                     <p className='follow'
                        style={following ?
                           {color: 'gray', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px' } :
                           {color: 'DeepSkyBlue',
                           fontWeight: 'bold',
                           fontSize: '11px',
                           cursor: 'pointer'
                           }}
                        value={post.Blogs.id}
                        onClick={follow}
                     >Follow</p>
                  </div>
                  <div className='underline'>
                  </div>
                  {post.type === 'image' &&
                     <img 
                        src={post.content}
                        alt='picture'
                        className='dash-img' />}
                  {post.type === 'words' && (
                     <p>{post.content}</p>
                  )}
                  {post.type === 'link' && (
                     <div className='link'>
                        <a href={post.content}>
                           {post.content}
                        </a>
                     </div>
                     )}
                  <p>{post.caption}</p>
                  <div className='underline'>
                  </div>
                  <div className='dash-btns'>
                     <i className="fas fa-heart fa-lg"
                        value={post.id}
                        onClick={like}
                        style={love ? { color: 'red' } : { color: 'none' }}
                     />
                     < i className="fas fa-sync-alt fa-lg" onClick={reblog}/>
                  </div>
                  <a href='/posts/id/likes' className='likes'>{post.Likes.length} likes</a>
               </div>
            </div>
         )
      }

      export default Post;