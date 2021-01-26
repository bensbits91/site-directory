import * as React from 'react';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';



export interface TopMenuProps {
    handler: any;
}

// export interface TopMenuState {}

class TopMenu extends React.Component<TopMenuProps, {}> {

    public constructor(props: TopMenuProps) {
        super(props);
        // this.state = { : };
    }

    public _items: ICommandBarItemProps[] = [
        {
            key: 'newItem',
            text: 'New',
            cacheKey: 'myCacheKey', // changing this key will invalidate this item's cache
            iconProps: { iconName: 'Add' },
            // href: ''
            // subMenuProps: {
            //     items: [
            //         {
            //             key: 'emailMessage',
            //             text: 'Email message',
            //             iconProps: { iconName: 'Mail' },
            //             ['data-automation-id']: 'newEmailButton' // optional
            //         },
            //         {
            //             key: 'calendarEvent',
            //             text: 'Calendar event',
            //             iconProps: { iconName: 'Calendar' }
            //         }
            //     ]
            // }
        },
        // {
        //     key: 'view',
        //     text: 'All sites',
        //     iconProps: { iconName: 'ThumbnailView' },
        //     // href: 'https://dev.office.com/fabric'
        //     href: 'https://ntandem-admin.sharepoint.com/_layouts/15/online/AdminHome.aspx#/siteManagement/'
        // },
        {
            key: 'admin',
            text: 'Admin',
            iconProps: { iconName: 'AdminSLogoInverse32' },
            // onClick: () => console.log('Share')
            href: 'https://ntandem-admin.sharepoint.com/'
        },
        {
            key: 'export',
            text: 'Export',
            iconProps: { iconName: 'ExcelLogo' },
            // onClick: () => console.log('Download')
        }
    ];
    
    public _farItems: ICommandBarItemProps[] = [
        {
            key: 'expandall',
            text: 'Expand all',
            iconProps: { iconName: 'ExploreContent' },
            onClick: () => this.props.handler('Expand all')
        },
        {
            key: 'collapseall',
            text: 'Collapse all',
            iconProps: { iconName: 'CollapseContent' },
            onClick: () => this.props.handler('Collapse all')
        }
    ];
    
    

    public render() {
        return (
            <CommandBar
                items={this._items}
                farItems={this._farItems}
                ariaLabel="Use left and right arrow keys to navigate between commands"
                styles={{root: {boxShadow: '-3px 3px 3px 2px #ddd', marginBottom: 12}}}
            />
        );
    }

}

export default TopMenu;