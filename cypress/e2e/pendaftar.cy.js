import { faker } from "@faker-js/faker"

describe('Pendaftaran', () => {
	it('Pendaftaran Mahasiswa', () => {
		cy.visit('/');
		cy.fixture('pendaftaran').then((data)=> {
			data.nik = '3528'+faker.number.int({ min: 100000000000, max: 999999999999 });

			// Jalur Pendaftaran
			cy.contains('Jalur Pendaftaran').click();
			
			// Memilih Jalur Pendaftaran
			cy.contains(data.jalurpendaftaran).parents('.main-section').contains('Daftar Sekarang').click();
			// cy.contains(data.jalurpendaftaran).parents('.main-section').within(() => {
			//   cy.contains('Daftar Sekarang').click()
			// });
			
			// memilih prodi
			cy.get('.select2-container').click();
			cy.get('.select2-dropdown').contains(data.prodipilihan).click();
			cy.LanjutDaftar();

			// mengisi form
			// informasi pribadi
			cy.fakerFullName('Anunya').then((namapendaftar) => {
				cy.get('#namapendaftar').type(namapendaftar);
			});
			cy.get('input[name="jk"][value="'+data.jeniskelamin+'"]').check({ force: true }); // menggunakan radio icheck
			cy.fakerNumberPhone().then((nohp) => {
				cy.get('#nohp').type(nohp);
			});
			cy.fakerEmail().then((email) => {
				cy.get('#email').type(email);
			});			
			cy.get('#tgllahir').type(data.tgllahir);
			cy.get('#tmplahir').type(data.tmplahir);
			// kewarganegaraan menggunakan select2
			cy.get('#select2-idnegara-container').click();
			cy.get('.select2-search__field').type(data.idnegara);
			cy.get('#select2-idnegara-results').each(($el, index, $list)=> {
				if ($el.text() === data.idnegara) {
					cy.wrap($el).click();
				}
			});
			cy.fakerNIK().then((nik) => {
				cy.get('#nik').type(nik);
			});	

			// asal sekolah
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
			// jenis sekolah menggunakan select2
			cy.get('#select2-idjenisinstitusi-container').click();
			cy.get('.select2-search__field').type(data.idjenisinstitusi);
			cy.get('#select2-idjenisinstitusi-results').each(($el, index, $list)=> {
				if ($el.text() === data.idjenisinstitusi) {
					cy.wrap($el).click()
				}
			});
			// sekolah menggunakan autocomplete
			cy.get('#npsn_label').type(data.npsn);
			cy.get('.tt-suggestions div').each(($el, index, $list) => {
				if ($el.text() === data.npsn_label) {
					cy.wrap($el).click();
				}
			});
			cy.get('#jurusan').type(data.jurusan);
			// tahun lulus menggunakan select2
			cy.get('#select2-thnlulus-container').click();
			cy.get('.select2-search__field').type(data.thnlulus);
			cy.get('#select2-thnlulus-results').each(($el, index, $list)=> {
				if ($el.text() === data.thnlulus) {
					cy.wrap($el).click()
				}
			});

			// pilihan prodi
			// prodi 2 menggunakan select2
			cy.get('#select2-pilihan_2-container').click();
    		cy.get('.select2-dropdown').contains(data.prodi2).click(); 
			cy.LanjutDaftar();
			
			// Konfirmasi Data Pendaftaran
			cy.get('#form__check1').check();
			cy.LanjutDaftar();

			// salin akun
			cy.get('#idpendaftar').invoke('text').then((text) => {
				cy.readFile('cypress/fixtures/pendaftaran.json').then((id) => {
					id.idpendaftar = text;
					cy.writeFile('cypress/fixtures/pendaftaran.json', id);
				});
			});
			cy.get('#pinpendaftar').invoke('text').then((text) => {
				cy.readFile('cypress/fixtures/pendaftaran.json').then((id) => {
					id.pinpendaftar = text;
					cy.writeFile('cypress/fixtures/pendaftaran.json', id);
				});
			});
			cy.contains('Masuk Sekarang').click();
		});
	});
})