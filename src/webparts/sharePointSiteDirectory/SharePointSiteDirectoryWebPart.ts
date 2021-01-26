import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SharePointSiteDirectoryWebPartStrings';
import SharePointSiteDirectory from './components/SharePointSiteDirectory';
import { ISharePointSiteDirectoryProps } from './components/ISharePointSiteDirectoryProps';

import { setup as pnpSetup } from "@pnp/common";

export interface ISharePointSiteDirectoryWebPartProps {
  description: string;
}

export default class SharePointSiteDirectoryWebPart extends BaseClientSideWebPart<ISharePointSiteDirectoryWebPartProps> {

  protected onInit(): Promise<void> {

    return super.onInit().then(_ => {
      pnpSetup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<ISharePointSiteDirectoryProps> = React.createElement(
      SharePointSiteDirectory,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
