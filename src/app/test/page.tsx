import { Post } from "@/@types/Post"
import { firestore } from "@/libs/firebase/clientApp"
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"

const getPosts = async () => {
  try {
    const postQuery = query(collection(firestore, 'posts'),
      orderBy('voteStatus', 'desc'),
      limit(10),
    )

    const postDocs = await getDocs(postQuery)
    const posts = postDocs.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Post[]

    return posts
  } catch (error) {
    console.log('buildUserHomeFeed error: ', error)
  }
}

export default async function TestPage() {
  const posts = await getPosts()

  return (
    <div>
      {posts?.map(post => post.id)}
    </div>
  )
}