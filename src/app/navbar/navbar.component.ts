import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchForm: FormGroup;

  role=sessionStorage.getItem("role")
  cats:any[]
  cartitem:number=0;
  wishitem:number=0;
  search:string
  constructor(private _router:Router,private api:ApiService,private route:ActivatedRoute,private fb: FormBuilder) { }

  // ngOnInit(): void {
  //   this.searchForm = this.fb.group({
  //     search: [''], // default value and other form controls if needed
  //   });
  // }

  ngOnInit(): void {
    console.log("role",this.role) 
    const custid=sessionStorage.getItem('id')
    if(custid!=null){ 
      this.api.getcustomerdetails(sessionStorage.getItem('id'))
      .subscribe({
        next:resp=>{
          const uinfo=resp.data
          console.log("info",uinfo.wishlist)
          // if(uinfo.wishlist.length>0)
          //   this.wishitem=uinfo.wishlist.reduce((count:number,x:any)=>count+1,0)
          // if(uinfo.cart.length>0)
          //   this.cartitem=uinfo.cartitem.reduce((count:number,x:any)=>count+x.qty,0)
        }
      })
    }

    this.api.listcategories().subscribe({
      next:resp=>this.cats=resp,
      error:err=>console.log(err.error)
    })
    this.route.queryParams.subscribe(p=>this.search=p['search'])
  }

  onSearch(): void {
    // Your search logic here
    console.log('Search button clicked!');
  }

  logout(){
    sessionStorage.clear();
    this._router.navigate(['/'])
  }

}
