import { FormLabel } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import type { ICategory } from '../store/categories.types.ts';

interface ICategoryItemProps {
  category: ICategory;
  value: string;
  onChange: (value: string) => void;
  name?: string;
}

const CategoryItem = ({
  category,
  value,
  onChange,
  name,
}: ICategoryItemProps) => {
  const isChecked = value === category.id;

  return (
    <FormLabel
      className="d-flex flex-column align-items-center p-2 pt-0 rounded-3"
      style={{
        backgroundColor: isChecked ? category.color : '',
        width: '100px',
      }}
      role="button"
    >
      <i
        className={`${category.icon} rounded-circle py-1 px-3 text-white `}
        style={{ fontSize: '2.5rem', backgroundColor: category.color }}
      />

      <span
        className={isChecked ? 'text-white' : ''}
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100px',
          textAlign: 'center',
        }}
      >
        {category.title}
      </span>
      <FormCheckInput
        name={name}
        type="radio"
        value={category.id}
        onChange={(e) => onChange(e.target.value)}
        className="d-none"
      />
    </FormLabel>
  );
};

export default CategoryItem;
