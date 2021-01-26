import * as React from 'react';
import { GroupedList, IGroup } from 'office-ui-fabric-react/lib/GroupedList';
// import { IColumn, DetailsRow } from 'office-ui-fabric-react/lib/DetailsList';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { SelectionMode } from 'office-ui-fabric-react/lib/Selection';
// import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

// import { createListItems, createGroups, IExampleItem } from '@uifabric/example-data';

const groupCount = 3;
const groupDepth = 3;

const mcc = 'color:aqua;';

export interface IGroupedSiteListProps {
    // root: any;
    // sites: any;
    // webs: any;
    groups: any;
}

export interface IGroupedSiteListState {
    isCompactMode?: boolean;
}

export class GroupedSiteList extends React.Component<IGroupedSiteListProps, IGroupedSiteListState> {
    private _items: any[];
    //   private _columns: IColumn[];
    // public _groups: IGroup[];
    //   private _selection: Selection;

    constructor(props) {
        super(props);

        // this._groups = this.props.groups;
        console.log('%c : GroupedSiteList -> constructor -> this.props', mcc, this.props);


        // this.props.sites.map(s => {
        //     console.log('%c : GroupedSiteList -> constructor -> s', mcc, s);
        //     // this._groups.push({
        //     //     key: s.SiteID,
        //     //     name: s.Title,
        //     //     startIndex: 0,
        //     //     count: 1
        //     // });
        //     console.log('%c : GroupedSiteList -> constructor -> this._groups', mcc, this._groups);
        // });




        // this._items = this.props.webs;


        // this._columns = Object.keys(this._items[0])
        //   .slice(0, 3)
        //   .map(
        //     (key: string): IColumn => ({
        //       key: key,
        //       name: key,
        //       fieldName: key,
        //       minWidth: 300
        //     })
        //   );


        // this._groups = createGroups(groupCount, groupDepth, 0, groupCount);

        // this._selection = new Selection();
        // this._selection.setItems(this._items);

        this.state = {
            isCompactMode: false
        };
    }

    public render(): JSX.Element {
        // const { isCompactMode } = this.state;

        return (
            <div>
                <FocusZone>
                    <GroupedList
                        items={null}
                        // items={this.props.groups}
                        onRenderCell={this._onRenderCell}
                        //   selection={this._selection}
                          selectionMode={SelectionMode.none}
                        groups={this.props.groups}
                        compact={false}
                    />
                </FocusZone>
            </div>
        );
    }

    private _onRenderCell = (nestingDepth: number, item: any, itemIndex: number): JSX.Element => {
        return (
            <div>item {itemIndex}</div>
            //   <DetailsRow
            //     columns={this._columns}
            //     groupNestingDepth={nestingDepth}
            //     item={item}
            //     itemIndex={itemIndex}
            //     selection={this._selection}
            //     selectionMode={SelectionMode.multiple}
            //     compact={this.state.isCompactMode}
            //   />
        );
    }

    //   private _onChangeCompactMode = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    //     this.setState({ isCompactMode: checked });
    //   };
}
