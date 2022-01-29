import { Users } from 'src/app/core/Apis/Users';
import { Categories } from 'src/app/core/Apis/Category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/Services/http.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { savedFile } from 'src/app/core/Apis/saveFile';
import { Posts } from 'src/app/core/Apis/Posts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  postLoad:boolean = true;
  cateLoad:boolean = true;
  userLoad:boolean = true;
  error:string = ''
  posts:any [] = [];
  imgPrefix = environment.PhotoUrl;


  categories:any[] = [];
  cCate:number= 0;
  addCategoryMood:boolean = false;
  editCategoryMood = false;

  editUserRoleMood:boolean=false;


  users:any [] = [];
  admins:any[] = [];
  normalUsers:any[] = [];
  cPost:number= 0;
  cUser:number= 0;
  cAdmin:number= 0;


  categoryForm:FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null,[Validators.required,Validators.minLength(3)])
  })

  RolesForm:FormGroup = new FormGroup({
    userName: new FormControl(null,[Validators.required,Validators.minLength(3)]),
    roleName: new FormControl(null,[Validators.required,Validators.minLength(3)])
  })
  constructor(private _HttpService:HttpService) { }

  ngOnInit(): void {
    this.laodCategories();
    this.loadUsersANdHisRoles();
    this.loadPosts();
  }


  showAddCategory(){
    this.addCategoryMood = true;
  }
  // add Category
  addCategory(categoryForm:FormGroup){

    categoryForm.controls['id'].setValue(0);
    // console.log(categoryForm.value);
    this._HttpService.Post(Categories.CreateCategory,categoryForm.value).subscribe(res=>{
      // console.log(res);
      this.laodCategories();
      this._HttpService.nCate.next(categoryForm.value);
    })
    this.addCategoryMood = false;
    categoryForm.reset();
  }
  closeAddCategory(){
    this.addCategoryMood = false;
  }


  // delete Catagory

  deleteCategory(category:any){
    // console.log(category);
    if (confirm("Delete Category !!")) {
      this._HttpService.Post(Categories.DeleteCategory,category).subscribe(res=>{
        // console.log(res);
        this._HttpService.nCate.next(category);
        this.laodCategories();
      })
    }

  }


  // edit Category

  showEditCategory(category:any){
    this.categoryForm.controls['name'].setValue(category.name)
    this.categoryForm.controls['id'].setValue(category.id)
    // console.log(this.categoryForm.value);
    this.editCategoryMood = true;
  }
  closeEditCategory(){
    this.editCategoryMood = false;
  }

  editCategory(form:FormGroup){
    // console.log(form.value);
    this._HttpService.Put(Categories.EditCategory,form.value).subscribe(res=>{
      this.editCategoryMood = false;
      this._HttpService.nCate.next(res.data);
      this.laodCategories();
      form.reset();
    })
  }



  //Edit Roles For Users

  showEditUserRole(user:any){
    this.RolesForm.controls['userName'].setValue(user.userName)
    // this.RolesForm.controls['roleName'].setValue(user.roleName)
    // console.log(this.categoryForm.value);
    this.editUserRoleMood = true;
  }
  closeEditUserRole(){
    this.editUserRoleMood = false;
  }

  editUserRole(form:FormGroup){
    // console.log(form.value);
    this._HttpService.Post(Users.AddOrRemoveFromRole,form.value).subscribe(res=>{
      // console.log(res);
      if (res.error != null) {
        this.error = res.error
      }
      else{
        this.editUserRoleMood = false;
        this.loadUsersANdHisRoles();
        form.reset()
      }
    })

  }



   // Delete Post
   deletePost(form:any){
    //  console.log(form);

    if (confirm("Delete Your Post !!")) {
      let photo = {
        name : form.photoName
      }
      this._HttpService.Post(savedFile.UnSavePhoto,photo).subscribe(res=>{
        // console.log(res);
      })
      let data = {
        "id": form.id,
        "title": form.title,
        "price": form.price,
        "description": form.description,
        "cateId": form.cateId,
        "userId": form.userId,
        "photoName": form.photoName
      }
      // console.log(data);
      this._HttpService.Post(Posts.DeletePost,data).subscribe(res=>{
        // console.log(res);
        this.loadPosts();

      })
    }

  }



  private laodCategories(){
    this._HttpService.Get(Categories.GetAllCategory).subscribe(res=>{
      this.categories = res.data;
      this.cCate = this.categories.length;
      this.cateLoad = false;
    })
  }

  private loadUsersANdHisRoles(){
    this.admins = [];
    this.normalUsers = [];
    this._HttpService.Get(Users.GetUsersAndThereRoles).subscribe(res=>{
      this.users = res.data
      this.users.forEach(user => {
        // console.log(user);
        if (user.roleName.includes('admin')||user.roleName.includes('ADMIN')) {
          this.admins.push(user)
        }else{
          this.normalUsers.push(user);
        }

      });

      this.cAdmin = this.admins.length;
      this.cUser = this.normalUsers.length;
      this.userLoad = false;
    })
  }

  private loadPosts(){
    this._HttpService.Get(Posts.GetAllPosts).subscribe(res=>{
      this.posts = res.data
      this.cPost = this.posts.length;
      this.postLoad = false;
    })
  }

}
