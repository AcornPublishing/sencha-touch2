package com.book.myhybridsqlite;

import android.provider.BaseColumns;

public final class TestDb  {
	public static final class User implements BaseColumns{
		private User(){}
		public static final String TABLE_NAME="user";
		public static final String COLUMN1 = "user_id";
		public static final String COLUMN2 = "user_name";
		public static final String COLUMN3 = "user_tel";
		
	}
	
	public static final class Hoby implements BaseColumns{
		private Hoby(){}
		public static final String TABLE_NAME="hoby";
		public static final String COLUMN1 = "user_id";
		public static final String COLUMN2 = "hoby_name";
		
	}
}
