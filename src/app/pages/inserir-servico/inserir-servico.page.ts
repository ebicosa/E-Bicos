import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-inserir-servico',
  templateUrl: './inserir-servico.page.html',
  styleUrls: ['./inserir-servico.page.scss'],
})
export class InserirServicoPage implements OnInit {

  faixasPrecos;
  categorias;
  subcategorias;
  inputs = ['', '', '', '', ''];
  croppedImagePath = "";
  isLoading = false;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  constructor(private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    private navCtrl : NavController) {
      if(localStorage.getItem("categorias") === null){
        localStorage.setItem("categorias", JSON.stringify([{nome: "Construção Civil"},{nome: "Serviços domésticos"}]));
      }
      if(localStorage.getItem("subcategorias") === null){
        localStorage.setItem("subcategorias", JSON.stringify([{nome: "Eletricista"},{nome: "Encanador"}]));
      }
      if(localStorage.getItem("faixasPrecos") === null){
        localStorage.setItem("faixasPrecos", JSON.stringify( [{minimo: 100, maximo: 1000},{minimo: 1000, maximo:5000}]));
      }
      this.faixasPrecos= JSON.parse(localStorage.getItem("faixasPrecos"));
      this.subcategorias=JSON.parse(localStorage.getItem("subcategorias"));
      this.categorias=JSON.parse(localStorage.getItem("categorias"));
  }


    pickImage(sourceType) {
      const options: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        this.croppedImagePath = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        // Handle error
      });
    }

    async selectImage() {
      const actionSheet = await this.actionSheetController.create({
        header: "Selecione uma opção",
        buttons: [{
          text: 'Carregar foto da galeria',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar Câmera',
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
        ]
      });
      await actionSheet.present();
    }

    onChange(obj, indice:number){
      this.inputs[indice] = obj;
    }

    onPostar(){
      var cards = [];
      cards = JSON.parse(localStorage.getItem("cards"));

      let nova_postagem = {
        autor: "USUÁRIO LOGADO",
        categoria: this.inputs[2],
        subcategoria: this.inputs[3],
        descricao: this.inputs[1],
        valor: "VALOR",
        cep: "CEP",
        cidade: "CIDADE",
        bairro: "BAIRRO",
        estado: "ESTADO",
        data: new Date().toLocaleDateString(),
        favorito: false,
        id: cards.length + 1,
      }

      cards.push(nova_postagem);
      localStorage.setItem("cards", JSON.stringify(cards));
      alert("Anúncio publicado com sucesso");
      this.navCtrl.navigateForward('servicos');
    }

  ngOnInit() {
  }

}
