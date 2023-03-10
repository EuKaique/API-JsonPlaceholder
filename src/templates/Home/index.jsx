import './styles.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { SearchInput } from '../../components/SearchInput';

class Home extends Component{

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: ''
  };

  componentDidMount(){
    this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos 
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value })
  }

render() {

  const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
  const noMorePosts = page + postsPerPage >= allPosts.length;
  const filteredPosts = !!searchValue ? 
        allPosts.filter(post => {
          return post.title.toLowerCase().includes(searchValue.toLocaleLowerCase());
        })
        : posts ;

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
            <h1>Procurando por: {searchValue}</h1>
        )}

        <SearchInput searchValue={searchValue} handleChange={this.handleChange}/>
      </div>

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts}/>
      )}
      {filteredPosts.length === 0 && (
        <p>Nenhum resultado encontrado :/ </p>
      )}

      <div className="button-container">
        {!searchValue && (
          <Button disabled={noMorePosts} text="Load more posts" onClick={this.loadMorePosts}/>
        )}
      </div>
    </section>
  );
}

}
export default Home;
