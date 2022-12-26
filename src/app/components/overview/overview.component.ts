import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { OverviewDataSourceService } from 'src/app/services/overview-data-source.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements AfterViewInit, OnInit {
  public name: string;
  public pageSize: number = 100;
  public displayedColumns: Array<string> = ['image', 'name'];
  @ViewChild(MatPaginator)
  private paginator: MatPaginator;

  constructor(public dataSource: OverviewDataSourceService) {}

  public ngOnInit(): void {
    this.dataSource.loadPage(0, this.pageSize);
  }

  public ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
