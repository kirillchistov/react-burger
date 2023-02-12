
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetailsStyles from './order-details.module.css'

const OrderDetails = (props) => {
  return(
    <div className={OrderDetailsStyles.container}>
      <p className={`${OrderDetailsStyles.number} text text_type_digits-large`}>034536</p>
      <p className={`${OrderDetailsStyles.caption} text text_type_main-medium`}>идентификатор заказа</p>
      <div className={OrderDetailsStyles.done}>
        <CheckMarkIcon type="primary" />     
      </div>
      <div className={OrderDetailsStyles.confirmationContainer}>
        <p className={`${OrderDetailsStyles.paragraph} text text_type_main-default`}>Ваш заказ начали готовить</p>
        <p className={`${OrderDetailsStyles.paragraph} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
      </div>
    </div>
  )
}

export default OrderDetails;