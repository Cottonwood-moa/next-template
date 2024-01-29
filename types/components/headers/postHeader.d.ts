export type PostTabs = Pick<Post, 'id' | 'title'>;

export interface PostTabProps {
  item: PostTabs;
  isSelected: boolean;
  onClick: () => void;
  onRemove: () => void;
}