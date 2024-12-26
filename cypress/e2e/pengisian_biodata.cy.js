import { faker } from "@faker-js/faker"

describe('Pendaftaran', () => {
	beforeEach('Login', () => {
		cy.visit('/login');
		cy.fixture('pendaftaran').then((data)=> {
			cy.get('#idpendaftar').type(data.idpendaftar);
			cy.get('#pin').type(data.pinpendaftar);
			cy.get('.button-pmb_primary').click();
		});
	});

	it('Biodata', () => {
		cy.visit('/biodata');
		cy.fixture("pendaftaran").then((data)=> {
			// biodata
			cy.get('#beratbadan').clear().type(data.beratbadan);
			cy.get('#tinggibadan').clear().type(data.tinggibadan);
			// suku menggunakan autocomplete
			cy.get('#idsuku_label').clear().type(data.idsuku);
			cy.get('.tt-suggestions div').each(($el, index, $list) => {
				if ($el.text() === data.idsuku) {
					cy.wrap($el).click();
				}
			});
			// agama menggunakan select2
			cy.get('#select2-idagama-container').click();
			cy.get('.select2-search__field').type(data.idagama);
			cy.get('#select2-idagama-results').each(($el, index, $list)=> {
				if ($el.text() === data.idagama) {
					cy.wrap($el).click()
				}
			});
			cy.fakerNIK().then((nokk) => {
				cy.get('#nokk').clear().type(nokk);
			});	
			// pekerjaan menggunakan select2
			cy.get('#select2-idpekerjaan-container').click();
    		cy.get('.select2-dropdown').contains(data.idpekerjaan).click(); 
			// almamater menggunakan select2
			cy.get('#select2-idalmamater-container').click();
    		cy.get('.select2-dropdown').contains(data.idalmamater).click(); 
			cy.SimpanLanjut();

			// biodata - alamat
			// provinsi menggunakan select2
			cy.get('#select2-idpropinsi-container').click();
			cy.get('.select2-search__field').type(data.idpropinsi);
			cy.get('#select2-idpropinsi-results').each(($el, index, $list)=> {
				if ($el.text() === data.idpropinsi.toUpperCase()) {
					cy.wrap($el).click();
				}
			});
			// kabupaten menggunakan select2
			cy.get('#select2-idkota-container').click()
			cy.get('.select2-search__field').type(data.idkota)
			cy.get('#select2-idkota-results').each(($el, index, $list)=> {
				if ($el.text() === data.idkota.toUpperCase()) {
					cy.wrap($el).click();
				}
			});
			// kecamatan menggunakan select2
			cy.get('#select2-idkecamatan-container').click()
			cy.get('.select2-search__field').type(data.idkecamatan)
			cy.get('#select2-idkecamatan-results').each(($el, index, $list)=> {
				if ($el.text() === data.idkecamatan.toUpperCase()) {
					cy.wrap($el).click();
				}
			});
			cy.get('#desa').clear().type(data.desa);
			cy.get('#rt').clear().type(data.rt);
			cy.get('#rw').clear().type(data.rw);
			cy.get('#kodepos').clear().type(data.kodepos);
			cy.get('#alamat').clear().type(data.alamat);
			cy.SimpanLanjut();

			// biodata - ibu
			cy.fakerFullName('Ny.').then((ibu) => {
				cy.get('#namakeluarga_I').clear().type(ibu);
			});	
			cy.fakerNIK().then((ibu_nik) => {
				cy.get('#nik_I').clear().type(ibu_nik);
			});	
			// jenjang menggunakan select2
			cy.get('#select2-idjenjang_I-container').click();
    		cy.get('.select2-dropdown').contains(data.ibu_idjenjang).click();
			// pekerjaan menggunakan select2
			cy.get('#select2-pekerjaan_I-container').click();
    		cy.get('.select2-dropdown').contains(data.ibu_pekerjaan).click();
			// penghasilan menggunakan select2
			cy.get('#select2-idpenghasilan_I-container').click();
    		cy.get('.select2-dropdown').contains(data.ibu_idpenghasilan).click();
			cy.get('#alamatkeluarga_I').clear().type(data.ibu_alamat);
			cy.get('#tmplahir_I').clear().type(data.ibu_tmplahir);
			cy.get('#tgllahir_I').clear().type(data.ibu_tgllahir);
			cy.fakerNumberPhone().then((ibu_nohp) => {
				cy.get('#telpkeluarga_I').clear().type(ibu_nohp);
			});	
			cy.fakerEmail().then((ibu_email) => {
				cy.get('#emailkeluarga_I').clear().type(ibu_email);
			});	

			// biodata - bapak
			cy.fakerFullName('Bpk.').then((bapak) => {
				cy.get('#namakeluarga_A').clear().type(bapak);
			});
			cy.fakerNIK().then((bapak_nik) => {
				cy.get('#nik_A').clear().type(bapak_nik);
			});	
			// jenjang menggunakan select2
			cy.get('#select2-idjenjang_A-container').click();
    		cy.get('.select2-dropdown').contains(data.bapak_idjenjang).click();
			// pekerjaan menggunakan select2
			cy.get('#select2-pekerjaan_A-container').click();
    		cy.get('.select2-dropdown').contains(data.bapak_pekerjaan).click();
			// penghasilan menggunakan select2
			cy.get('#select2-idpenghasilan_A-container').click();
    		cy.get('.select2-dropdown').contains(data.bapak_idpenghasilan).click();
			cy.get('#alamatkeluarga_A').clear().type(data.bapak_alamat);
			cy.get('#tmplahir_A').clear().type(data.bapak_tmplahir);
			cy.get('#tgllahir_A').clear().type(data.bapak_tgllahir);
			cy.fakerNumberPhone().then((bapak_nohp) => {
				cy.get('#telpkeluarga_A').clear().type(bapak_nohp);
			});	
			cy.fakerEmail().then((bapak_email) => {
				cy.get('#emailkeluarga_A').clear().type(bapak_email);
			});
			cy.SimpanLanjut();
			
			// biodata - sekolah
			cy.fakerNISN().then((nisn) => {
				cy.get('#nisn').clear().type(nisn);
			});	
			cy.SimpanLanjut();
			cy.contains('LANJUT ISI BERKAS').click();
		});
	});

	it('Berkas Administrasi', () => {
		cy.visit('/administrasi');
		cy.fixture('pendaftaran').then((data) => {
			cy.get('a.btn').contains('Pilih File').should('be.visible');
			cy.get('input[name="fotopendaftar"]').attachFile('background.png');
			cy.contains('SIMPAN').click();
			cy.contains('OK').click();
		});
	});

	it('Pengumpulan Data', () => {
		cy.visit('/finalisasi');
		cy.get('#filled-in-box').check();
		cy.contains('KUMPULKAN DATA').click();
		cy.contains('OK').click();
	});
})