import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { Mehrsprachigkeit } from 'src/app/shared/mehrsprachigkeit';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-text-management',
  templateUrl: './text-management.component.html',
  styleUrl: './text-management.component.css',
  standalone: false,
})
export class TextManagementComponent implements OnInit{
  mehrsprachigkeiten: Mehrsprachigkeit[] = [];
  mehrsprachigkeitenGrouped: any[] = [];
  selectedMehrsprachigkeit: Mehrsprachigkeit = {
    id: '',
    deutsch: '',
    englisch: ''
  };

  @ViewChild('editModal') editModal!: TemplateRef<any>;

  constructor(private backendService: BackendService, private modalService: NgbModal, config: NgbModalConfig, private translate: TranslateService){
    config.backdrop = 'static';
    config.keyboard = false;
  }

  loadMehrsprachigkeitenGrouped(): void {
    this.backendService.getAllMehrsprachigkeitGrouped().subscribe({
      next: (data) => {
        this.mehrsprachigkeitenGrouped = data;
      },
      error: (err) => {
        console.error('Fehler beim Laden der gruppierten Einträge', err);
      }
    });
  }

  trackByMehrsprachigkeit(index: number, mehrsprachigkeit: Mehrsprachigkeit): string {
    return mehrsprachigkeit.id;  // oder ein anderer eindeutiger Schlüssel
  }

  openEditModal(item: Mehrsprachigkeit): void {
    this.selectedMehrsprachigkeit = { ...item }; // Kopie, um Änderungen zu isolieren
    this.modalService.open(this.editModal, { ariaLabelledBy: 'modal-basic-title' });
  }

  saveEdit(): void {
    if (!this.selectedMehrsprachigkeit) return;

    this.backendService.updateMehrsprachigkeit(
      this.selectedMehrsprachigkeit.id,
      this.selectedMehrsprachigkeit
    ).subscribe({
      next: () => {
        for (let group of this.mehrsprachigkeitenGrouped) {
          const index = group.translations.findIndex(
            (m: Mehrsprachigkeit) => m.id === this.selectedMehrsprachigkeit.id
          );
          if (index !== -1) {
            group.translations[index] = { ...this.selectedMehrsprachigkeit };
            break;
          }
        }
        this.modalService.dismissAll();
      },
      error: (err) => {
        console.error('Fehler beim Speichern', err);
      },
    });
  }


  ngOnInit(): void {
    this.loadMehrsprachigkeitenGrouped();
  }
}
