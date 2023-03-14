import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://agendamentosonline.mne.gov.pt/AgendamentosOnline/app/scheduleAppointmentForm.jsf#cal0');

    // Set screen size
    await page.setViewport({width: 1080, height: 1024});

    console.log(1)
    const idInput = await page.waitForSelector("[id='scheduleForm:tabViewId:ccnum']");
    await idInput.type('32293625')
    const birthDayInput = await page.waitForSelector("[id='scheduleForm:tabViewId:dataNascimento_input']");
    await birthDayInput.type('22-08-1994')

    console.log(2)
    const toLookForButton = await page.waitForSelector("[id='scheduleForm:tabViewId:searchIcon']");
    await toLookForButton.click();

    console.log(3)
    const embassySelect = await page.waitForSelector("[id='scheduleForm:postcons_label']");
    await embassySelect.click();
    const embassyOption = await page.waitForSelector("[id='scheduleForm:postcons_panel'] li:last-child");
    await embassyOption.click();

    console.log(4)
    const categorySelect = await page.waitForSelector("[id='scheduleForm:categato_label']");
    await categorySelect.click()
    const categoryOption = await page.waitForSelector("[id='scheduleForm:categato_panel'] li:nth-child(2)");
    await categoryOption.click()

    console.log(5)
    const addActionButton = await page.waitForSelector("[id='scheduleForm:bAddAto']");
    await addActionButton.click();

    console.log(6)
    const termsCheckBox = await page.waitForSelector("[id='scheduleForm:dataTableListaAtos:0:selCond_input']");
    await termsCheckBox.click();

    console.log(7)
    const scheduleButton = await page.waitForSelector("[id='scheduleForm:dataTableListaAtos:0:bCal']");
    await scheduleButton.click();

    console.log(8)

    try {
        await page.waitForXPath('//*[contains(text(), "De momento não existem vagas disponíveis, por favor tente mais tarde.")]')
        console.log('ohhh et hapali')
    } catch (e) {
        console.log('maher yesh torim!')
        console.log(e)
    }

    await browser.close();
})();