import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-query-lists',
  templateUrl: './query-lists.component.html',
  styleUrls: ['./query-lists.component.scss']
})
export class QueryListsComponent implements OnInit {
  products: any[] = [
    {
      "name": "Aceite", "price": "$28,000", "description": "200ml", "mark": "LiquiMolly 20 w-50", "imgUrl": "https://motosymotoselpaisa.com/backend/admin/backend/web/archivosDelCliente/items/images/LUBRICANTES-ACEITES-ACEITE-LIQUIMOLY-4T-20W50-HD-SYNTETCI-1L-452320190303194537.JPG", "available": "false"
    },
    {
      "name": "Llantas", "price": "$350,000", "description": "c/u", "mark": "Kinergy ST", "imgUrl": "https://media.aws.alkosto.com/media/catalog/product/cache/6/image/69ace863370f34bdf190e4e164b6e123/8/8/8808563424163_1.jpg", "available": "true"

    },
    {
      "name": "Limpia Tapiz", "price": "$130,000", "description": "400ml", "mark": "Sapolio", "imgUrl": "https://oechsle.vteximg.com.br/arquivos/ids/1116278-1000-1000/image-b28c4a371b894eac815e5933f5a14359.jpg?v=637031524713270000", "available": "true"

    },
    {
      "name": "Cadena de moto", "price": "$70,000", "description": "Racing Champion", "mark": "RK", "imgUrl": "https://www.hipershop.es/im%C3%A1genes/R-and-K/R-and-K-RK-Cadena-GB525XSO-Oro-625750941.jpg", "available": "false"

    },
    {
      "name": "Filtro de aire", "price": "$530,000", "description": "Negro arlen", "mark": "Sucker stage", "imgUrl": "https://www.iguanacustom.com/catalog/images/productos/ign-19914.jpg", "available": "true"

    }, 
    {
      "name": "Pistón", "price": "$130,000", "description": "Junta de anillo de piston", "mark": "Vortex", "imgUrl": "https://motosymotoselpaisa.com/backend/admin/backend/web/archivosDelCliente/items/images/LUBRICANTES-ACEITES-ACEITE-LIQUIMOLY-4T-20W50-HD-SYNTETCI-1L-452320190303194537.JPG", "available": "false"

    }
  ];

  constructor() { }

  ngOnInit() {
    
  }

}
