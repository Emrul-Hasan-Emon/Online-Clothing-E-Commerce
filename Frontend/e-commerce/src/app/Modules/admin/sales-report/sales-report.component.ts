import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/Service/Order/order.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  allOrders = [];
  deliveredOrders = [];
  totalDeliveredOrders: number = 0;
  totalEarnings: number = 0;
  startDate: string = '';
  endDate: string = '';
  filterMark: boolean = false;
  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  private fetchAllOrders() {
    this.orderService.fetchAllOrders().subscribe(
      (orders: any) => {
        console.log(orders);
        orders.forEach(order => {
          if(order.status.toLowerCase() === 'delivered') {
            this.allOrders.push(order);
            this.totalDeliveredOrders++;
            this.totalEarnings += order.payableCost;
          }
        });
        this.deliveredOrders = this.allOrders;
      }
    )
  }

  ngOnInit(): void {
    this.fetchAllOrders();
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${this.getMonthName(monthIndex)} ${year}`;
  }

  getMonthName(monthIndex: number): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthIndex];
  }

  showOrderDetails(orderID: number, status: string) {
    this.router.navigate(['single-order-history-details', orderID], { queryParams: { status: status } });
  }

  onDateRangeFilter() {
    if (this.startDate && this.endDate) {
      this.deliveredOrders = this.allOrders.filter(order => {
        const orderDate = new Date(order.orderDate);
        const startDate = new Date(this.startDate);
        const endDate = new Date(this.endDate);
        return orderDate >= startDate && orderDate <= endDate;
        this.filterMark = true;
      });
    } else {
      this.deliveredOrders = this.allOrders;
    }
  }

  undoFilteres() {
    this.filterMark = false;
    this.deliveredOrders = this.allOrders;
  }
}
