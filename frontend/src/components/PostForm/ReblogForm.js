import { useEffect, useState } from 'react';
import React from 'react';
import { reblogPost, showPost } from '../../store/post';
import { useDispatch, useSelector } from 'react-redux';
import {parseDate} from '../../utils/helpers'
import { Link, useParams, useHistory } from 'react-router-dom'
import '../UserBlog/UserBlog.css'



const ReblogForm = () => {
   const {postId} = useParams()
   console.log(postId, 'id from reblog form')
   const history = useHistory()
   const dispatch = useDispatch()

   const post = useSelector((state) => state.post.post)
   const sessionUser = useSelector(state => state.session.user);
   
   useEffect(() => {
      dispatch(showPost(postId))
   },[])


   const goBack = (e) => {
      history.push('/dashboard')
   }

   const repost = async(e) => {
      e.preventDefault()
      await dispatch(reblogPost(post))
      const blogName = sessionUser.blogName;
      await history.push(`/${blogName}`)
   }


   if (post) {
      return (
         <div className='reblog' style={{marginTop: '100px'}}>
            <h4>Reblog this post?</h4>
            <div key={post.id}>
               {post.type === 'image' && (
                  <div className='image-post'>
                     <img 
                     src={post.content} 
                     alt='image' 
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
               <p style={{color: 'black', marginBottom: '40px'}}>
               {post.caption}
               </p>
            </div>
            <form onSubmit={repost}>
            <button type='submit'>Yes</button>
            <button type='button' onClick={goBack}>Back</button>
         </form>
         </div>
      )
   } else {
      return <h1>Loading...</h1>
   }


}

export default ReblogForm;