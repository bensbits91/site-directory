import * as React from 'react';
// import styles from './SharePointSiteDirectory.module.scss';
import { ISharePointSiteDirectoryProps } from './ISharePointSiteDirectoryProps';

import { sp } from "@pnp/sp/presets/all";
import { ISearchQuery, SearchResults, SearchQueryBuilder } from "@pnp/sp/search";

import TopMenu from './TopMenu';
import Tree from './Tree';

import './temp.css';

const mcc = 'color:lime;background-color:black;';

export interface ISharePointSiteDirectoryState {
  root?: any;
  sites?: any;
  webs?: any;
  groups?: any;
  toggleAll?: string;
}

export default class SharePointSiteDirectory extends React.Component<ISharePointSiteDirectoryProps, ISharePointSiteDirectoryState> {

  public constructor(props) {
    super(props);
    this.state = {

    };
  }

  public componentDidMount() {
    console.clear();
    this.get_root_site().then((root: any) => {
      console.log('%c : SharePointSiteDirectory -> componentDidMount -> root', mcc, root);
      this.get_sites(root.Id).then((results_sites: any) => {
        const sites = results_sites.PrimarySearchResults;
        console.log('%c : SharePointSiteDirectory -> componentDidMount -> sites', mcc, sites);
        this.get_webs().then((results_webs: any) => {
          const webs = results_webs.PrimarySearchResults;
          console.log('%c : componentDidMount -> webs', mcc, webs);




          let groups = [];
          groups.push({
            key: root.Id,
            name: root.Title,
            count: 1,
            startIndex: 0
          });
          sites.map(s => {
            groups.push({
              key: s.SiteID,
              name: s.Title,
              count: 1,
              startIndex: 0
            });
          });
          console.log('%c : SharePointSiteDirectory -> componentDidMount -> groups', mcc, groups);









          this.setState({
            root: root,
            sites: sites,
            webs: webs,
            groups: groups
          });
        });
      });
    });
    this.handler_topMenu = this.handler_topMenu.bind(this);
  }

  public componentDidUpdate(prevProps: ISharePointSiteDirectoryProps, prevState: ISharePointSiteDirectoryState) {
    if (prevState !== this.state) console.log('%c : SharePointSiteDirectory -> componentDidUpdate -> this.state', mcc, this.state);
  }

  public get_root_site = () => new Promise(resolve => {
    const r = sp.site.rootWeb();
    resolve(r);
  })

  public get_sites = (rootId) => new Promise(resolve => {
    const _searchQuerySettings: ISearchQuery = {
      TrimDuplicates: false,
      RowLimit: 500,
      // SelectProperties: ["Title", "SPWebUrl", "projectID"],
      SelectProperties: [
        "CreatedOWSDate",
        "DisplayAuthor",
        "ModifiedBy",
        "ModifiedOWSDate",
        "ParentId",
        "projectID",
        "SiteID",
        "SiteTemplate",
        "SiteTitle",
        "SPSiteUrl",
        "SPWebUrl",
        "Title",
        "UrlDepth",
        "WebId"
      ],
      Properties: [{
        Name: "EnableDynamicGroups",
        Value: {
          BoolVal: true,
          QueryPropertyValueTypeIndex: 3
        }
      }]
    };

    let q = SearchQueryBuilder("contentclass:STS_Site WebId<>" + rootId, _searchQuerySettings).rowLimit(500);

    sp.search(q).then((r: SearchResults) => {
      resolve(r);
    });
  })

  public get_webs = () => new Promise(resolve => {
    const _searchQuerySettings: ISearchQuery = {
      TrimDuplicates: false,
      RowLimit: 500,
      SelectProperties: [
        "CreatedOWSDate",
        "DisplayAuthor",
        "ModifiedBy",
        "ModifiedOWSDate",
        "ParentId",
        "projectID",
        "SiteID",
        "SiteTemplate",
        "SiteTitle",
        "SPSiteUrl",
        "SPWebUrl",
        "Title",
        "UrlDepth",
        "WebId"
      ],
      Properties: [{
        Name: "EnableDynamicGroups",
        Value: {
          BoolVal: true,
          QueryPropertyValueTypeIndex: 3
        }
      }]
    };

    let q = SearchQueryBuilder("contentclass:STS_Web", _searchQuerySettings).rowLimit(500);

    sp.search(q).then((r: SearchResults) => {
      resolve(r);
    });
  })

  public handler_topMenu(what) {
    console.log('%c : SharePointSiteDirectory -> handler_topMenu -> what', mcc, what);
    console.log('%c : SharePointSiteDirectory -> handler_topMenu -> this.state.toggleAll', mcc, this.state.toggleAll);
    if (!this.state.toggleAll || this.state.toggleAll != what) {
      this.setState({ toggleAll: what });
    }
  }

  public render(): React.ReactElement<ISharePointSiteDirectoryProps> {
    return (
      <>
        <TopMenu handler={this.handler_topMenu} />
        {this.state.root && this.state.sites && this.state.webs &&
          <Tree
            root={this.state.root}
            sites={this.state.sites}
            webs={this.state.webs}
            toggleAll={this.state.toggleAll}
          />
        }
      </>
    );
  }

}
