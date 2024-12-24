import React, { useState } from "react";
import { FormField, Loader } from "../components/index";

function RenderCards({ posts, title }) {
  if (posts?.length > 0) {
    return (
        posts.map((post) =>(
        <Card key={post.id} {...post} />
        ))
    );
  }

  return (
    <>
      <h1>No Posts Found</h1>
    </>
  );
}

function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [loader, setLoader] = useState(false);

  return (
    <>
      <section>
        <div>
          <h2>Community Posts</h2>
          <p>Browse through DAL E Model for most posts</p>
        </div>
        <div>
          <FormField />
        </div>
        <div>
          {
            loader ? (
              <Loader/>
            ) : (
              <RenderCards title="Title of Render Data" data={[]} />
            )
          }
        </div>
      </section>
    </>
  );
}

export default Home;
