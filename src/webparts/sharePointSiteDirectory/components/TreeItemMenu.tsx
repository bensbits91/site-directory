import * as React from 'react';
import { IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';
import { IconButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
// import { Link } from 'office-ui-fabric-react/lib/Link';

const mcc = 'background-color:black;';

export interface TreeItemMenuProps {

}
// export interface TreeItemMenuState {}

class TreeItemMenu extends React.Component<TreeItemMenuProps, {}> {

    public constructor(props: TreeItemMenuProps) {
        super(props);
        // this.state = { :  };
    }

    private _onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
        console.log('%c : TreeItemMenu -> item', mcc, item);

        return (
            item.name
            //   <Link role="menuitem" styles={{ root: { marginRight: 10 } }} onClick={item.onClick}>
            //     {item.name}
            //   </Link>
        );
    }

    private _onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
        const buttonStyles: Partial<IButtonStyles> = {
            root: {
                minWidth: 0,
                padding: '0 4px',
                alignSelf: 'stretch',
                height: 'auto'
            }
        };

        return (
            <IconButton
                role="menuitem"
                title="More options"
                styles={buttonStyles}
                menuIconProps={{ iconName: 'More' }}
                menuProps={{ items: overflowItems! }}
            />
        );
    }

    public render() {
        return (
            <OverflowSet
                overflowItems={[
                    {
                        key: 'newSubsite',
                        name: 'Create a new subsite',
                        // onClick: noOp
                    },
                    {
                        key: 'newApp',
                        name: 'Create a list or library',
                        // onClick: noOp
                    },
                    {
                        key: 'showApps',
                        name: 'Show lists and libraries',
                        // onClick: noOp
                    },
                    {
                        key: 'emailOwner',
                        name: 'Email the primary administrator',
                        // onClick: noOp
                    },
                ]}
                onRenderOverflowButton={this._onRenderOverflowButton}
                onRenderItem={this._onRenderItem}
            />
        );
    }
}

export default TreeItemMenu;