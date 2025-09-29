const customCategoryIcons = [
  'bi-cash-coin',
  'bi-piggy-bank',
  'bi-bus-front',
  'bi-fuel-pump',
  'bi-phone',
  'bi-laptop',
  'bi-scissors',
  'bi-palette',
  'bi-balloon',
  'bi-heart',
  'bi-calculator',
  'bi-shield-check',
  'bi-mortarboard',
  'bi-star',
];

const CustomCategoriesList = () => {
  return (
    <div>
      {customCategoryIcons.map((icon) =>       <i
          className={`${icon} rounded-circle py-2 px-3 text-white `}
          style={{ fontSize: '2rem', backgroundColor: 'lightgrey' }}
      />)}

    </div>
  );
};

export default CustomCategoriesList;
