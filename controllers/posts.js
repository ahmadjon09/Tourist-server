import Post from '../models/posts.js'
import Client from '../models/client.js'

export const createPost = async (req, res) => {
  const { phoneNumber, smsContent } = req.body

  try {
    const client = await Client.findOne({ phoneNumber })

    if (!client) {
      return res.status(404).json({ message: 'Client not found!' })
    }

    const newPost = new Post({
      client: client._id,
      smsContent,
      firstName: client.firstName,
      avatar: client.photo[0],
      address: client.address
    })

    await newPost.save()

    res.status(201).json({
      message: 'Post created successfully!',
      data: newPost
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const AllPosts = async (_, res) => {
  try {
    const posts = await Post.find()
    return res.status(200).json({ data: posts })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error!' })
  }
}

export const likePost = async (req, res) => {
  const { id } = req.params
  const { phoneNumber } = req.body

  try {
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found!' })
    }

    if (post.likes.includes(phoneNumber)) {
      return res.status(400).json({ message: 'You can only like once!' })
    }

    if (post.dislikes.includes(phoneNumber)) {
      post.dislikes.pull(phoneNumber)
    }

    post.likes.push(phoneNumber)
    await post.save()

    return res.status(200).json({
      message: 'Post liked successfully!',
      data: post
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const dislikePost = async (req, res) => {
  const { id } = req.params
  const { phoneNumber } = req.body

  try {
    const post = await Post.findById(id)
    if (!post) {
      return res.status(404).json({ message: 'Post not found!' })
    }

    if (post.dislikes.includes(phoneNumber)) {
      return res.status(400).json({ message: 'You can only dislike once!' })
    }

    if (post.likes.includes(phoneNumber)) {
      post.likes.pull(phoneNumber)
    }

    post.dislikes.push(phoneNumber)
    await post.save()

    return res.status(200).json({
      message: 'Post disliked successfully!',
      data: post
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

export const DeletePost = async (req, res) => {
  const { id } = req.params
  try {
    const deletedPost = await Post.findByIdAndDelete(id)
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found.' })
    }
    return res.status(200).json({ message: 'Post deleted successfully.' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' })
  }
}
