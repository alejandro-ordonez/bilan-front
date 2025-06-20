
import { Component, OnInit, } from '@angular/core';
import { GameGateway } from '@domain/gateways/game.gateway';

@Component({
    selector: 'panel-reset',
    templateUrl: './panel-reset.component.html',
    styleUrls: ['./panel-reset.component.scss'],
})
export class PanelResetComponent implements OnInit {
    page: number = 0;
    totalPages: number = 1;
    resets: any;

    estados: any = {
        Active: "Activo",
        ProcessingClosing: "Procesando cerrado",
        Closed: "Cerrado"
    }

    async ngOnInit(): Promise<void> {
        this.getResets()
    }

    constructor(private gateGateway: GameGateway) {

    }

    nextPage() {
        this.page++;
    }
    lastPage() {
        this.page--;
    }

    async resetGame() {
        const respuesta = confirm('Esta acción es irreversible, ¿estás seguro?')
        if (respuesta) {
            try {
                await this.gateGateway.resetGame();

                alert("Reset de juegos iniciado");

            } catch (error) {
                alert("Ha ocurrido un error inesperado")
            }
        } else {

        }

    }

    async getResets() {
        this.resets = [];
        try {
            const response = await this.gateGateway.getResets(this.page.toString());
            this.resets = response.data.map((reset: any) => {
                return {
                    ...reset,
                    gameStatus: this.estados[reset.gameStatus]
                }
            });
            this.totalPages = response.npages;
        } catch (error) { }
    }


}
