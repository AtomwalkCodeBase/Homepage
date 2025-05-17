import React from 'react'
import HeroBlog from '../HeroBlog'
import BlogList from './BlogList'
import BlogPosts from '../BlogPosts'

const Blog = () => {
  return (
    <div>
      <HeroBlog></HeroBlog>
      {/* <BlogList/> */}
      <BlogPosts></BlogPosts>

    </div>
  )
}

export default Blog