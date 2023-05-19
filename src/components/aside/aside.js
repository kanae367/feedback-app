import { Link } from 'react-router-dom';
import './aside.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../loading/Loading';
import { filterSelected, roadmapFetched } from '../feedbacks-list/feedbacksSlice';

const Aside = () => {
    const dispatch = useDispatch();

    const options = ['UI', 'UX', 'Enhancement', 'Bug', 'Feature'];
    const feedbacks = useSelector(state => state.feedbacks);
    const roadmap = useSelector(state => state.roadmap);

    useEffect(() => {
        if(feedbacks){
            const newRoadmap = roadmap.map(item => {
                const name = item.name;
                return {
                    name,
                    amount: feedbacks.filter(item => item.status === name).length
                }
            });
            if(roadmap !== newRoadmap) dispatch(roadmapFetched(newRoadmap));
        } 
        //eslint-disable-next-line
    }, [feedbacks])

    const onFilterSelect = (item) => {
        dispatch(filterSelected(item))
    }

    const onFilterClick = (e) => {
        if(!e.target.classList.contains('aside__tags-item')) return;
        document.querySelectorAll('.aside__tags-item').forEach(item => item.classList.remove('aside__tags-item_active'));
        e.target.classList.add('aside__tags-item_active');
    }

    const optionsList = options
            .map((item, index) => {
                return <li className='aside__tags-item' onClick={() => onFilterSelect(item)} key={index}>{item}</li>
            })
    
    const roadmapList = roadmap ? roadmap
            .map((item, index) => {
                return <li className="roadmap__item" key={index}>{item.name} <span>{item.amount}</span></li>
            }) : null; 
    

    return(
        <div className="aside">
            <div className="aside__info">
                <h1 className="title">Frontend Mentor</h1>
                <p className="subtitle">Feedback Board</p>
            </div>
            <button className="aside__btn-container">
                <div className="aside__btn"></div>
            </button>
            <div className="aside__container">
                <div className="aside__element">
                    <ul className="aside__tags" onClick={onFilterClick}>
                        <li className="aside__tags-item aside__tags-item_active " onClick={() => onFilterSelect('all')}>All</li>
                        {optionsList}
                    </ul>
                </div>
                <div className="aside__element">
                    <div className="roadmap__header">
                        <h2 className="title">Roadmap</h2>
                        <Link className="roadmap__btn" to="/roadmap">View</Link>
                    </div>
                    <ul className="roadmap__list">
                        {roadmap ? roadmapList : <Loading/>}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Aside;