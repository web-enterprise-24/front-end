import { useBlogStore } from '../../store';
import Comment from './Comment';

const CommentLists = () => {
	const rootComments = useBlogStore((state) => state.rootComments);
	return (
		<div className='space-y-4'>
			{/* Sample comment - replace with real comments */}
			{rootComments.map((comment) => (
				<Comment
					key={comment.id}
					data={comment}
				/>
			))}
		</div>
	);
};

export default CommentLists;
