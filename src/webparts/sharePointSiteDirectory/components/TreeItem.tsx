import * as React from 'react';
import { ActivityItem, Icon, Link/* , mergeStyleSets */ } from 'office-ui-fabric-react';
import TreeItemMenu from './TreeItemMenu';

const mcc = 'color:orange;';

/* const classNames = mergeStyleSets({
    exampleRoot: {
        marginTop: '20px'
    },
    nameText: {
        fontWeight: 'bold'
    }
});

const activityItemExamples = [
    {
        key: 1,
        activityDescription: [
            <Link
                key={1}
                className={classNames.nameText}
                onClick={() => {
                    alert('A name was clicked.');
                }}
            >
                Philippe Lampros
        </Link>,
            <span key={2}> commented</span>
        ],
        activityIcon: <Icon iconName={'Message'} />,
        comments: [
            <span key={1}>Hello! I am making a comment and mentioning </span>,
            <Link
                key={2}
                className={classNames.nameText}
                onClick={() => {
                    alert('An @mentioned name was clicked.');
                }}
            >
                @Anđela Debeljak
        </Link>,
            <span key={3}> in the text of the comment.</span>
        ],
        timeStamp: 'Just now'
    },
    {
        key: 2,
        activityDescription: [
            <Link
                key={1}
                className={classNames.nameText}
                onClick={() => {
                    alert('A name was clicked.');
                }}
            >
                Lisha Refai
        </Link>,
            <span key={2}> deleted </span>,
            <span key={3} className={classNames.nameText}>
                DocumentTitle.docx
        </span>
        ],
        activityIcon: <Icon iconName={'Trash'} />,
        timeStamp: '2 hours ago'
    },
    {
        key: 3,
        activityDescription: [
            <Link
                key={1}
                className={classNames.nameText}
                onClick={() => {
                    alert('A name was clicked.');
                }}
            >
                Julian Arvidsson
        </Link>,
            <span key={2}> moved </span>,
            <Link
                key={3}
                className={classNames.nameText}
                onClick={() => {
                    alert('A document was clicked.');
                }}
            >
                PresentationTitle.pptx
        </Link>,
            <span key={4}> to </span>,
            <Link
                key={5}
                className={classNames.nameText}
                onClick={() => {
                    alert('A folder was clicked.');
                }}
            >
                Destination Folder
        </Link>
        ],
        activityIcon: <Icon iconName={'FabricMovetoFolder'} />,
        timeStamp: 'Yesterday'
    }
];
 */


 
export interface TreeItemProps {
    name: string;
    id: string;
    author: string;
    template: string;
    created: string;
    url: string;
    toggled: boolean;
    hasKids: boolean;
    kidCount?: number;
    kidType?: string;
}
// export interface TreeItemState {}

class TreeItem extends React.Component<TreeItemProps, {}> {
    public constructor(props: TreeItemProps) {
        super(props);
        // this.state = { : };
    }

    public componentDidMount() {
        console.log('%c : TreeItem -> componentDidMount -> this.props', mcc, this.props);
    }

    public render() {

        const createdInfo = this.props.created && this.props.author
            ? 'Created ' + this.props.created + ' by ' + this.props.author
            : this.props.created
                ? 'Created ' + this.props.created
                : this.props.author
                    ? 'Created by ' + this.props.author
                    : '';

        const kidCountSpan = this.props.kidCount && this.props.kidCount > 0
            ? <span key={3}> ({this.props.kidCount} {this.props.kidType})</span>
                : <></>;

        const item = {
            key: this.props.id,
            activityDescription: [
                <span key={1} className='treeItemName'>
                    {this.props.name}
                </span>,
                this.props.template && <span key={2}> ({this.props.template})</span>,
                kidCountSpan,
                <TreeItemMenu />
            ],
            activityIcon: <Icon iconName={this.props.hasKids ? this.props.toggled ? 'Remove' : 'Add' : ''} />,
            comments: [
                this.props.url &&
                <Link
                    key={1}
                    className='treeItemUrl'
                    href={this.props.url}
                    target='_blank'
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* {this.props.url} */}
                    <span dangerouslySetInnerHTML={{__html: this.props.url}} />
                </Link>
            ],
            timeStamp: createdInfo
        };

        const isCompact: boolean = !createdInfo && !this.props.url;

        return (
            <>
                <ActivityItem
                    {...item}
                    key={item.key}
                    className='treeItemRoot'
                    isCompact={isCompact}
                />
            </>
        );
    }
}

export default TreeItem;
