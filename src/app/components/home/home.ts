import { Component } from '@angular/core';
import { Quiniela } from '../../model/Quiniela';
import { Equipo } from '../../model/Equipo';
import { Match } from '../../model/Match';
import { HttpClient } from '@angular/common/http';
import { PartidosOficiales } from '../../partidos-oficiales';
import { Vecino } from '../../vecino';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  matcheslist:Match[] = []
  partidosOficialesList:PartidosOficiales[] = []
  quinielaID:string = ""

  ngOnInit(): void {
   this.getPartidosOficiales();
  
  }
 constructor(private http:HttpClient){
  
 }

 getPartidosOficiales(){
  this.http.get("http://localhost:8080/v1/partidosoficiales").subscribe((result:any)=>{
    this.partidosOficialesList = result;

    for (let index = 0; index < this.partidosOficialesList.length; index++) {
     const team1 = new Equipo(this.partidosOficialesList[index].equipo1,0);
     const team2 = new Equipo(this.partidosOficialesList[index].equipo2,0);
     const tempMatch = new Match(team1,team2);
     this.matcheslist.push(tempMatch);  
    }
  })
 }

 quinielaModel = new Quiniela(new Vecino("",0),this.matcheslist);

  onSubmit(){
    console.log(this.quinielaModel);
    this.http.post("http://localhost:8080/v1/quiniela",this.quinielaModel).subscribe((result:any)=>{
    this.quinielaID = "Quiniela ID: "+result.quinielaID
  })
  }
}
