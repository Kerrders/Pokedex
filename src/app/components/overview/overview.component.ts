import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { OverviewDataSourceService } from 'src/app/services/overview-data-source.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements AfterViewInit, OnInit {
  public pageSize = 20;
  public displayedColumns: Array<string> = ['name'];
  public pageSizeOptions: Array<number> = [5, 10, 25, 100];
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  constructor(public _httpClient: HttpClient, public dataSource: OverviewDataSourceService) {}

  ngOnInit(): void {
    this.dataSource.loadPage(1);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
