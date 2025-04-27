import xapi from 'xapi';

const spacesUrl = 'https://workspaces.dnaspaces.io/?token=161#/dashboard';
//please retrive the url from Cisco Spaces UI with the help of Cisco TAC.

function displaySpacesMap() {
  xapi.Command.UserInterface.WebView.Display({
    Mode: 'Fullscreen',
    Target: 'Controller',
    Title: 'Cisco Spaces Floor 20',
    Url: spacesUrl
  });

  xapi.Command.UserInterface.WebView.Display({
    Mode: 'Fullscreen',
    Target: 'OSD',
    Title: 'Cisco Spaces Floor 20',
    Url: spacesUrl
  });
}

function closeWebView() {
  xapi.Command.UserInterface.WebView.Clear({ Target: 'Controller' });
  xapi.Command.UserInterface.WebView.Clear({ Target: 'OSD' });

  xapi.Command.UserInterface.WebView.Display({
    Mode: 'Fullscreen',
    Target: 'Controller',
    Title: 'Clearing',
    Url: 'about:blank'
  });

  xapi.Command.UserInterface.WebView.Display({
    Mode: 'Fullscreen',
    Target: 'OSD',
    Title: 'Clearing',
    Url: 'about:blank'
  });

  setTimeout(() => {
    xapi.Command.UserInterface.WebView.Clear({ Target: 'Controller' });
    xapi.Command.UserInterface.WebView.Clear({ Target: 'OSD' });
  }, 500);
}

function guiEvent(event) {
  if (event.WidgetId === 'GO20' && event.Type === 'released') {
    console.log('Floor 20 map opened');
    displaySpacesMap();
  } else if (event.WidgetId === 'CLOSE20' && event.Type === 'released') {
    console.log('Floor 20 map closed');
    closeWebView();
  }
}

xapi.Event.UserInterface.Extensions.Widget.Action.on(guiEvent);

async function addPanel() {
  console.info("Adding panel for Floor 20");
  
  const xml = `
    <Extensions>
      <Version>1.11</Version>
      <Panel>
        <Order>2</Order>
        <PanelId>Floor Map - 20</PanelId>
        <Origin>local</Origin>
        <Type>Home</Type>
        <Icon>Proximity</Icon>
        <Color>#07C1E4</Color>
        <Name>Floor Map - 20</Name>
        <ActivityType>Custom</ActivityType>
        <Page>
          <Name>Floor Map - 20</Name>
          <Row>
            <Name>Options</Name>
            <Widget>
              <WidgetId>GO20</WidgetId>
              <Name>Floor Map - 20</Name>
              <Type>Button</Type>
              <Options>size=2</Options>
            </Widget>
            <Widget>
              <WidgetId>CLOSE20</WidgetId>
              <Name>Close Map</Name>
              <Type>Button</Type>
              <Options>size=2</Options>
            </Widget>
          </Row>
        </Page>
      </Panel>
    </Extensions>`;
  
  await xapi.Command.UserInterface.Extensions.Panel.Save(
    { PanelId: 'Floor Map - 20' },
    xml
  );
}

addPanel();