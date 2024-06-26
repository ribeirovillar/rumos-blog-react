import React, { useState, useEffect, useCallback } from 'react';
import './PostForm.css';

function PostForm({ post, categoryOptions, onSave, onCancel }) {
    const initializeState = useCallback(() => ({
        title: post?.title || '',
        content: post?.content || '',
        categories: post?.categories || [],
    }), [post]);
    
    const [state, setState] = useState(initializeState);
    const [error, setError] = useState('');

    useEffect(() => {
        setState(initializeState());
    }, [initializeState]);

    const toggleCategory = (value, checked) => {
        setState(prevState => {
            const newCategories = checked
                ? [...prevState.categories, value]
                : prevState.categories.filter(category => category !== value);
            return { ...prevState, categories: newCategories };
        });
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === "checkbox") {
            toggleCategory(value, checked);
        } else {
            setState(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (state.categories.length === 0) {
            setError('Please select at least one category.');
            return;
        }
        try {
           onSave?.({ ...state, id: post?.id }, Boolean(post?.id));
           resetForm();
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    };

    const resetForm = () => {
        setState(initializeState);
        onCancel?.();
        setError('');
    }
    
    return (
        <form className="postForm" onSubmit={handleSubmit}>
            <label htmlFor="title">Título</label>
            <input
                type="text"
                id="title"
                name="title"
                value={state.title}
                onChange={handleInputChange}
                required
            />

            <label htmlFor="content">Conteúdo</label>
            <textarea
                id="content"
                name="content"
                value={state.content}
                onChange={handleInputChange}
                required
            />

            <fieldset>
                <legend>Categorias</legend>
                {categoryOptions.map(option => (
                    <div key={option}>
                        <input
                            type="checkbox"
                            id={option}
                            name="categories"
                            value={option}
                            checked={state.categories.includes(option)}
                            onChange={e => toggleCategory(option, e.target.checked)}
                        />
                        <label htmlFor={option}>{option}</label>
                    </div>
                ))}
            </fieldset>

            <div className="formActions">
                <button type="submit" className="saveButton">Salvar</button>
                <button type="button" className="cancelButton" onClick={resetForm}>Cancelar</button>
            </div>
            {error && <p className="commentError">{error}</p>}
        </form>
    );
}

export default PostForm;