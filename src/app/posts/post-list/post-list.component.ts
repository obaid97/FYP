import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';
import { SearchComponent } from '../../search/search.component';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})




export class PostListComponent implements OnInit, OnDestroy {
  count = 0;
  posts: Post[] = [];
  isloading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userId: string;
  private postsSub: Subscription;
  private authServiceSub: Subscription;
  userIsAuthenticated = false;

  constructor(public postsService: PostsService, private authService: AuthService) { }

  ngOnInit() {
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.isloading = true;
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService.getPostUpdate()
      .subscribe((postData: { posts: Post[], postCount: number }) => {
        this.isloading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authServiceSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
    this.count = this.posts.length % 3;
    console.log(this.count);
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isloading = true;
    this.postsService.deletepost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }, () => {
      this.isloading = false;

    });
  }





  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authServiceSub.unsubscribe();
  }

  //end
}
