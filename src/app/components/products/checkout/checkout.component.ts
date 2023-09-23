import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number = 0;
  userInfo: any ;
  productList: any ;

  cardImages: string[] = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/1200px-Visa.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png",
    "https://trak.in/wp-content/uploads/2020/01/Rupay-Cards-Big-1.jpg"
  ];

  constructor(public productService: ProductsService,private authService:AuthService, private orderService:OrdersService) { }

  ngOnInit(): void {
    this.productList = this.productService.cartProducts;
    this.totalPrice = this.productService.cartProducts.reduce((prev, next) => prev + (next['price'] * next['quantity']), 0);
    this.authService.getCurrentUser().subscribe((response:any) =>{
      this.userInfo = response;
      console.log(this.userInfo);
      console.log(this.productList);
    })
  }

  placeOrder() {
      if(this.productList.length>0) {
        let orderObj =  {
          "orderStatus": "New",
          "email": this.userInfo?.email,
          "address": this.userInfo?.street,
          "name": this.userInfo?.fullName,
          "paymentStatusTitle": "Completed",
          "paymentMethodTitle": "COD",
          "contact": this.userInfo?.contact,
          "totalItems": this.productList.length,
          "itemsSubTotal": this.totalPrice,
          "shipmentCharges": 33,
          "totalAmount": this.totalPrice,
          "paymentStatus": 1,
          "paymentMethod": 2,
          "userId": this.userInfo?.userId ,
          "orderItems":[{}]      
        }
        orderObj.orderItems = [];
        this.productList.forEach((prd:any) => {
          orderObj.orderItems?.push({
            productId:prd.productId,
            "productTitle":prd.productTitle,
            "productDescription":prd.productDescription,
            "productCode":prd.productCode,
            "productImg":prd.imgUrl,
            "productCategory":prd.productCategory.categoryName,
            "price":prd.price,
            "quantity":prd.quantity,
            "totalPrice":(prd.price*prd.quantity)
        })
        });

        this.orderService.addOrder(orderObj).subscribe((res:any) =>{
          console.log(res);
          
        })
       
      }
  }

}
