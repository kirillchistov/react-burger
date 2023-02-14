
//  Компонент OrderDetails содержит тестовые данные. Тексты из макета  //
//  Скоро будет функциональность создания заказа, номер заказа и др. придут с сервера  //
//  Надо подумать о месте для хранения тестовых данных (props -> localStorage, не cookie же?) //
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetailsStyle from './order-details.module.css'

const OrderDetails = () => {
  return(
    <div className={OrderDetailsStyle.orderContainer}>
      <p className={`${OrderDetailsStyle.orderNumber} text text_type_digits-large`}>034537</p>
      <p className={`${OrderDetailsStyle.orderCaption} text text_type_main-medium`}>идентификатор заказа</p>
      <div className={OrderDetailsStyle.orderAccepted}>
        <CheckMarkIcon type="primary" />     
      </div>
      <div className={OrderDetailsStyle.statusContainer}>
        <p className={`${OrderDetailsStyle.statusMessage} text text_type_main-default`}>Ваш заказ начали готовить</p>
        <p className={`${OrderDetailsStyle.statusMessage} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбите</p>
      </div>
    </div>
  )
}

//  Валдидировать нечего - пропсов пока нет  //

export default OrderDetails;